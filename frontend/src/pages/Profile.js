import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: black;
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  margin-bottom: 1rem;
  color: black;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: black;
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: black;
  }
`;

const Button = styled.button`
  background-color: black;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    opacity: 0.9;
  }
`;

const TalentList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
`;

const TalentTag = styled.div`
  background-color: #f0f0f0;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: red;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0;
`;

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    bio: '',
    hourlyRate: '',
    talents: []
  });
  const [newTalent, setNewTalent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(response.data);
    } catch (err) {
      setError('Error fetching profile');
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/api/users/profile', profile, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setError('');
    } catch (err) {
      setError('Error updating profile');
    }
  };

  const handleAddTalent = (e) => {
    e.preventDefault();
    if (newTalent.trim() && !profile.talents.includes(newTalent.trim())) {
      setProfile({
        ...profile,
        talents: [...profile.talents, newTalent.trim()]
      });
      setNewTalent('');
    }
  };

  const handleRemoveTalent = (talentToRemove) => {
    setProfile({
      ...profile,
      talents: profile.talents.filter(talent => talent !== talentToRemove)
    });
  };

  return (
    <Container>
      <Title>Your Profile</Title>
      <Form onSubmit={handleSubmit}>
        <Section>
          <SectionTitle>Basic Information</SectionTitle>
          <Input
            type="text"
            name="name"
            placeholder="Full Name"
            value={profile.name}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={profile.email}
            onChange={handleChange}
            required
          />
          <TextArea
            name="bio"
            placeholder="Tell us about yourself"
            value={profile.bio}
            onChange={handleChange}
          />
          <Input
            type="number"
            name="hourlyRate"
            placeholder="Hourly Rate ($)"
            value={profile.hourlyRate}
            onChange={handleChange}
          />
        </Section>

        <Section>
          <SectionTitle>Your Talents</SectionTitle>
          <Form onSubmit={handleAddTalent}>
            <Input
              type="text"
              placeholder="Add a talent"
              value={newTalent}
              onChange={(e) => setNewTalent(e.target.value)}
            />
            <Button type="submit">Add Talent</Button>
          </Form>
          <TalentList>
            {profile.talents.map((talent, index) => (
              <TalentTag key={index}>
                {talent}
                <RemoveButton onClick={() => handleRemoveTalent(talent)}>×</RemoveButton>
              </TalentTag>
            ))}
          </TalentList>
        </Section>

        <Button type="submit">Save Profile</Button>
      </Form>
      {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>{error}</p>}
    </Container>
  );
};

export default Profile; 