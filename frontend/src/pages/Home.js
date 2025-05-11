import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Hero = styled.section`
  text-align: center;
  padding: 4rem 2rem;
  margin-bottom: 4rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: black;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: #666;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const Button = styled(Link)`
  display: inline-block;
  background-color: black;
  color: white;
  padding: 1rem 2rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.1rem;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const Features = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const FeatureCard = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const FeatureTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: black;
`;

const FeatureDescription = styled.p`
  color: #666;
  line-height: 1.6;
`;

const Home = () => {
  return (
    <Container>
      <Hero>
        <Title>Connect with Expert Talent</Title>
        <Subtitle>
          Learn from the best in their fields. Book one-on-one sessions with experts
          and master new skills through personalized video training.
        </Subtitle>
        <Button to="/search">Find Your Expert</Button>
      </Hero>

      <Features>
        <FeatureCard>
          <FeatureTitle>Expert Instructors</FeatureTitle>
          <FeatureDescription>
            Connect with verified experts who are passionate about teaching and sharing
            their knowledge with others.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureTitle>Live Video Sessions</FeatureTitle>
          <FeatureDescription>
            Learn in real-time through interactive video sessions, with the ability to
            ask questions and get immediate feedback.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureTitle>Flexible Learning</FeatureTitle>
          <FeatureDescription>
            Schedule sessions at your convenience and learn at your own pace with
            personalized instruction.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureTitle>Secure Payments</FeatureTitle>
          <FeatureDescription>
            Safe and secure payment processing ensures a smooth experience for both
            learners and instructors.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureTitle>Skill Verification</FeatureTitle>
          <FeatureDescription>
            Get certified for your newly acquired skills and showcase your progress
            to potential employers or clients.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureTitle>Community Support</FeatureTitle>
          <FeatureDescription>
            Join a community of learners and instructors, share experiences, and
            grow together.
          </FeatureDescription>
        </FeatureCard>
      </Features>
    </Container>
  );
};

export default Home; 