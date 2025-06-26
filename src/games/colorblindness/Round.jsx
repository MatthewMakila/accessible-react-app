import { useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';


export default function Round({ roundNumber }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const round = roundNumber || Number(id) || 1;
  
  switch (round) { // Switch to handle different rounds
    case 1:
      return (
        <>
        <Container fluid className="fullscreen-flex" style={{ backgroundColor: ' #e5e9f2' }}>
          <Card border="dark">
            <Card.Header>
              <Card.Title>Color Blindness – Round {round}/4</Card.Title>
            </Card.Header>
            <Card.Body>
              <ul>
                <li>In this round, you will have 30 seconds to pop as many red or green balloons as possible. </li>
                <li>You will see instructions to pop either a red or green balloon displayed underneath the time bar.</li>
                <li>Popping the correct color increases your score, while popping the incorrect color decreases your score and increases the computer's.</li>
              </ul>
              <Button variant="success" size="lg" onClick={() => navigate(`/colorblindness/game/${round}`)}>Begin!</Button>
            </Card.Body>
          </Card>
        </Container>
        </>
      );
    case 2:
      return (
        <Container fluid className="fullscreen-flex" style={{ backgroundColor: ' #e5e9f2' }}>
          <Card border="dark">
            <Card.Header>
              <Card.Title>Color Blindness – Round {round}/4</Card.Title>
            </Card.Header>
            <Card.Body>
              <ul>
                <li>In this round, you will play by the same rules, once again having 30 seconds to pop as many red or green balloons as possible.</li>
                <li>This time, however, you will experience what it's like to play with red-green color blindess, also known as Deuteranomaly.</li>
              </ul>
              <Button variant="success" size="lg" onClick={() => navigate(`/colorblindness/game/${round}`)}>Begin!</Button>
            </Card.Body>
          </Card>
        </Container>
      );      
    case 3:
      return (
        <Container fluid className="fullscreen-flex" style={{ backgroundColor: ' #e5e9f2' }}>
          <Card border="dark">
            <Card.Header>
              <Card.Title>Color Blindness – Round {round}/4</Card.Title>
            </Card.Header>
            <Card.Body>
              <ul>
                <li>In this round, you will play just as you did in round one, but each balloon will be labeled with a letter representing its respective color.</li>
                <li>R = Red</li>
                <li>G = Green</li>
                <li>Y = Yellow</li>
              </ul>
              <Button variant="success" size="lg" onClick={() => navigate(`/colorblindness/game/${round}`)}>Begin!</Button>
            </Card.Body>
          </Card>
        </Container>
      );
    case 4:
      return (
        <Container fluid className="fullscreen-flex" style={{ backgroundColor: ' #e5e9f2' }}>
          <Card border="dark">
            <Card.Header>
              <Card.Title>Color Blindness – Round {round}/4</Card.Title>
            </Card.Header>
            <Card.Body>
              <ul>
                <li>In this round, you will... </li>
              </ul>
              <Button variant="success" size="lg" onClick={() => navigate(`/colorblindness/game/${round}`)}>Begin!</Button>
            </Card.Body>
          </Card>
        </Container>
      );
    default:
      break;
  }
}