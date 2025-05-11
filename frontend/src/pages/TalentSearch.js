import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

const SearchContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: black;
  }
`;

const Button = styled.button`
  background-color: black;
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

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const ExpertCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
`;

const ExpertName = styled.h2`
  margin: 0 0 0.5rem 0;
  color: black;
`;

const ExpertBio = styled.p`
  color: #666;
  margin-bottom: 1rem;
`;

const TalentTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const TalentTag = styled.span`
  background-color: #f0f0f0;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.9rem;
`;

const HourlyRate = styled.p`
  font-weight: 500;
  margin-bottom: 1rem;
`;

const BookButton = styled(Button)`
  width: 100%;
`;

const TalentSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/users/search?talent=${searchTerm}`);
      setExperts(response.data);
    } catch (error) {
      console.error('Error searching experts:', error);
    }
    setLoading(false);
  };

  const handleBookSession = async (expertId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.post(
        'http://localhost:5000/api/payments/create-session',
        { expertId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Redirect to Stripe Checkout
      window.location.href = response.data.url;
    } catch (error) {
      console.error('Error booking session:', error);
    }
  };

  return (
    <Container>
      <Title>Find Your Expert</Title>
      <SearchContainer>
        <Input
          type="text"
          placeholder="Search for a talent (e.g., 'guitar', 'programming', 'cooking')"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <Button onClick={handleSearch}>Search</Button>
      </SearchContainer>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ResultsGrid>
          {experts.map((expert) => (
            <ExpertCard key={expert._id}>
              <ExpertName>{expert.name}</ExpertName>
              <ExpertBio>{expert.bio}</ExpertBio>
              <TalentTags>
                {expert.talents.map((talent, index) => (
                  <TalentTag key={index}>{talent}</TalentTag>
                ))}
              </TalentTags>
              <HourlyRate>${expert.hourlyRate}/hour</HourlyRate>
              <BookButton onClick={() => handleBookSession(expert._id)}>
                Book a Session
              </BookButton>
            </ExpertCard>
          ))}
        </ResultsGrid>
      )}
    </Container>
  );
};

export default TalentSearch; 