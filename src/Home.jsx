import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import './index.css'

function Home() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100" style={{ padding: '20px', backgroundColor: '#e5e9f2' }}>
        <h2>Welcome to the Accessibility Game Hub</h2>    
        <Row>
            <Link to="/colorblindness">Colorblindness Game</Link>
        </Row>
        <Row>
            <Link to="/someGame">Game... (WIP)</Link>
        </Row>
        
        {/* Add more games here as you build them */}
        {/* <Link to="/someGame">some Game</Link> */}

    </div>
  );
}

export default Home;