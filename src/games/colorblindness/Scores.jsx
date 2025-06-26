import { useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function ColorBlindScoreboard() {
  const navigate = useNavigate();

  // get scores from localStorage
  const playerScores = localStorage.getItem('player_score') || 0;
  const compScores = localStorage.getItem('computer_score') || 0;

  return (
    <>
      {/* Feel free to change so much UI things here to get it working! */}
      <Container fluid className="fullscreen-flex" style={{ backgroundColor: ' #e5e9f2' }}>
        <Card>
          <Card.Header>
            <h1>Scoreboard (WIP)</h1>
          </Card.Header>
          <Card.Body>
            <Row style={{ padding: '20px' }}>
              <Col md="auto"><h2>Player Score: {playerScores}</h2></Col>
              <Col md="auto"><h2>Computer Score: {compScores}</h2></Col>
            </Row>
            <Button variant="primary" size="lg" onClick={() => navigate(`/`)}>Home</Button>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}