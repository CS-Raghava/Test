import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: black;
`;

const VideoContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  background-color: #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 16/9;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  background-color: ${props => props.danger ? '#dc3545' : 'black'};
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    opacity: 0.9;
  }
`;

const Meeting = () => {
  const { id } = useParams();
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const peerConnection = useRef();

  useEffect(() => {
    initializeMeeting();
    return () => {
      // Cleanup
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
      if (peerConnection.current) {
        peerConnection.current.close();
      }
    };
  }, []);

  const initializeMeeting = async () => {
    try {
      // Get user media
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      // Initialize WebRTC
      initializeWebRTC(stream);
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  };

  const initializeWebRTC = (stream) => {
    const configuration = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' }
      ]
    };

    peerConnection.current = new RTCPeerConnection(configuration);

    // Add local stream
    stream.getTracks().forEach(track => {
      peerConnection.current.addTrack(track, stream);
    });

    // Handle remote stream
    peerConnection.current.ontrack = (event) => {
      setRemoteStream(event.streams[0]);
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    // Handle ICE candidates
    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        // Send the candidate to the other peer
        sendIceCandidate(event.candidate);
      }
    };
  };

  const sendIceCandidate = async (candidate) => {
    try {
      await axios.post(`http://localhost:5000/api/meetings/${id}/ice-candidate`, {
        candidate
      });
    } catch (error) {
      console.error('Error sending ICE candidate:', error);
    }
  };

  const toggleMute = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsVideoOff(!isVideoOff);
    }
  };

  const endCall = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    if (peerConnection.current) {
      peerConnection.current.close();
    }
    window.location.href = '/';
  };

  return (
    <Container>
      <Title>Meeting Room</Title>
      <VideoContainer>
        <VideoWrapper>
          <Video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
          />
        </VideoWrapper>
        <VideoWrapper>
          <Video
            ref={remoteVideoRef}
            autoPlay
            playsInline
          />
        </VideoWrapper>
      </VideoContainer>
      <Controls>
        <Button onClick={toggleMute}>
          {isMuted ? 'Unmute' : 'Mute'}
        </Button>
        <Button onClick={toggleVideo}>
          {isVideoOff ? 'Turn On Video' : 'Turn Off Video'}
        </Button>
        <Button danger onClick={endCall}>
          End Call
        </Button>
      </Controls>
    </Container>
  );
};

export default Meeting; 