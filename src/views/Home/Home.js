
import { View, Heading } from '@aws-amplify/ui-react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

const Home = ({ signOut }) => {
  return (
    <Container fluid className="hero">
        <Container>
          <Row className="justify-content-md-center">
            <Heading level={1} textAlign="center"> Welcome to InkTrax Portal </Heading>
            <Button href="/products">Products</Button>
            <Button href="/orders">MY ORDERS</Button>
            <Button href="/account">MY ACCOUNT</Button>
          </Row>
        </Container>
    </Container>
  );
};

export default Home;