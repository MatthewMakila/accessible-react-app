import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import CountdownTimer from './CountdownTimer';

const ColorblindGame = () =>{
  // The components below are more dynamic than vars housed within UseEffect, so we define them here.
  const { round } = useParams(); // grab the round num from the URL params
  const roundNumber = Number(round) || 1;
  const navigate = useNavigate(); // route to rounds
  const stopGameRef = useRef(() => {});
  const resetGameRef = useRef(() => {});
  const gameEndedRef = useRef(false);
  const svgWidth = useRef(0);
  const svgHeight = useRef(0);
  const radius = useRef(0);
  
  // refs for HTML elements
  const svgRef = useRef(null);
  const gameKeyRef = useRef(null);
  const targetColorTextRef = useRef(null);
  const resultMessageRef = useRef(null);
  const playerScoreRef = useRef(0);
  const computerScoreRef = useRef(0);
  const gameOverPopupRef = useRef(null);
  const [gameOverMessage, setGameOverMessage] = useState("");
  // for modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => { // resizeObserver to update SVG dimensions for screen orientation changes
    const observer = new ResizeObserver(() => {
      if (!svgRef.current) return; // if svgRef is not available, do nothing
      const rect = svgRef.current.getBoundingClientRect();
      svgWidth.current = rect.width;
      svgHeight.current = rect.height;
      radius.current = svgHeight.current * 0.10;
      resetGameRef.current(); // reset game to apply new dimensions
    });

    if (svgRef.current) {
      observer.observe(svgRef.current);
    }

    return () => {
      if (svgRef.current) observer.unobserve(svgRef.current);
    };
  }, []);

  useEffect(() => { // set viewport height for mobile devices
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVH();
    window.addEventListener('resize', setVH);
    return () => window.removeEventListener('resize', setVH);
  }, []);

  useEffect(() => { // redirect to next round when game ends (modal is closed)
    if (!show && gameEndedRef.current) {
      const ROUND_1 = 1;
      const ROUND_4 = 4;

      if (roundNumber < ROUND_4) {
        navigate(`/colorblindness/round/${roundNumber + 1}`);
      } else {
        navigate(`/colorblindness/round/${ROUND_1}`); // Or to results/debrief page
      }
    }
  }, [show, roundNumber, navigate]);
  
  useEffect(() => {
    if (!svgRef.current) { // make sure the SVG canvas is available
      console.error("SVG canvas not found!");
      return;
    }
    // constant info
    const ROUND_1 = 1; const ROUND_2 = 2; const ROUND_3 = 3; const ROUND_4 = 4;
    const RED = 'red'; const GREEN = 'green'; const YELLOW = 'yellow';
    const RED_LABEL = 'R'; const GREEN_LABEL = 'G'; const YELLOW_LABEL = 'Y';
    const colors_2 = [RED, GREEN] // we never actually try to pop yellow balls (I think this is constant for all rounds)
    const numBalls = 9;
    const velocity = 1; // fixed ball velocity
    const { width, height } = svgRef.current.getBoundingClientRect(); // getBoundingClientRect to get initial rendered size of canvas
    svgWidth.current = width;
    svgHeight.current = height;
    radius.current = svgHeight.current * 0.10;
    gameEndedRef.current = false;

    let balls = [];
    let targetColor = '';
    let playerScore = 0;
    let computerScore = 0;
    let winMessage = "Congrats, you won! 🎉 ";
    let loseMessage = "Time's up! Better luck next time. 😢 ";

    let colors  // adapted from how they defined colors in old version
    if (
      roundNumber === ROUND_2 ||
      roundNumber === ROUND_4
    ) {
      colors = [
        {color: RED, color_val: '#988c66'},
        {color: GREEN, color_val: '#d0b869'},
        {color: YELLOW, color_val: '#f6d154'}
      ]
    } else {
      colors = [
        {color: RED, color_val: '#F95F62'},
        {color: GREEN, color_val: '#77D353'},
        {color: YELLOW, color_val: '#FFC82C'}
      ]
    }

    // display the game key
    if (roundNumber === ROUND_3 || roundNumber === ROUND_4) {
        gameKeyRef.current.innerHTML = "Controls Key:<br>Left Mouse Button = Pop Balloons<br><br>Game Key:<br>R = Red<br>G = Green<br>Y = Yellow";
    } else {
        gameKeyRef.current.innerHTML = "Controls Key:<br>Left Mouse Button = Pop Balloons";
    }

    /************** 
    GAME MECHANICS 
    ***************/

    function updateScores() {
        playerScoreRef.current.textContent = `Player: ${playerScore}`;
        computerScoreRef.current.textContent = `Computer: ${computerScore}`;
    }

    function stopGame() {
        if (gameEndedRef.current) return; // if game ended, do nothing
        gameEndedRef.current = true;

        // show popup (msg based on win/lose)
        let didWin = playerScore > computerScore;
        setGameOverMessage(didWin ? winMessage : loseMessage);
        handleShow() // show popup

        // make balls inaccessible to screen readers when game ends
        balls.forEach(ball => {
            const el = ball.element;
            el.removeAttribute('tabindex');
            el.removeAttribute('aria-label');
            el.setAttribute('aria-hidden', 'true');
            el.style.pointerEvents = 'none';
        });
    }

    function resetGame() {
        setTargetColor();
        createBalls();
    }

    function setTargetColor() { // for the game, pick random target color that isn't yellow
        targetColor = colors_2[Math.floor(Math.random() * colors_2.length)];
        targetColorTextRef.current.textContent = `Pop ${targetColor}!`; // do we want this text to be colored according to the target color?
    }

    /************** 
    BALL FUNCTIONS 
    ***************/
    function getRandomPosition() {
        return {
            x: Math.random() * (svgWidth.current - 2 * radius.current) + radius.current,
            y: Math.random() * (svgHeight.current - 2 * radius.current) + radius.current,
            dx: velocity * (Math.random() < 0.5 ? 1 : -1), // Fixed speed, random direction
            dy: velocity * (Math.random() < 0.5 ? 1 : -1)  // Fixed speed, random direction
        };
    }

    function createBalls() {
        balls = [];
        svgRef.current.innerHTML = ''; // Clear previous balls

        for (let i = 0; i < numBalls; i++) {
            const { x, y, dx, dy } = getRandomPosition();
            const { color, color_val } = colors[i % colors.length]; // get color name and color hex value
        
            const group = document.createElementNS('http://www.w3.org/2000/svg', 'g'); // since SVG doesn't support text inside a circle, we group them
            group.setAttribute('transform', `translate(${x}, ${y})`); // to help move balls
            group.setAttribute('tabindex', '0'); // make balls tab-able
            group.setAttribute('role', 'button'); // announce that this is a button to screen readers
        
            const ball = document.createElementNS('http://www.w3.org/2000/svg', 'circle');  // Create the circle
            ball.setAttribute('cx', 0);
            ball.setAttribute('cy', 0);
            ball.setAttribute('r', radius.current);
            ball.setAttribute('fill', color_val);
            
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');    // text to visually indicate ball color with a letter
            text.setAttribute('x', 0);
            text.setAttribute('y', radius.current * 0.25); // adjustment to center text
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('font-size', radius.current * 0.75);
            text.setAttribute('fill', 'black');
            text.setAttribute('pointer-events', 'none');
            
            if (roundNumber === ROUND_1 || roundNumber === ROUND_2) { // if 1st half of game, no text labels, only color announcement
                group.setAttribute('aria-label', `${color} ball`);
            }

            if (roundNumber === ROUND_3 || roundNumber === ROUND_4) { // if 2nd half of game, add text labels, change ball announcement
                switch (color) {
                    case RED:
                        group.setAttribute('aria-label', `${color} ball, label ${RED_LABEL}`);
                        text.textContent = RED_LABEL;
                        break;
                    case GREEN:
                        group.setAttribute('aria-label', `${color} ball, label ${GREEN_LABEL}`);
                        text.textContent = GREEN_LABEL;
                        break;
                    case YELLOW:
                        group.setAttribute('aria-label', `${color} ball, label ${YELLOW_LABEL}`);
                        text.textContent = YELLOW_LABEL;
                        break;
                }
            }
        
            group.addEventListener('click', function () {   // click handler for the group (text + circle)
                if (color === targetColor) {
                    playerScore++;
                    resultMessageRef.current.textContent = "Correct!";
                    resultMessageRef.current.style.color = GREEN;
                } else {
                    computerScore++;
                    playerScore--;
                    resultMessageRef.current.textContent = "Wrong!";
                    resultMessageRef.current.style.color = RED;
                }
                updateScores();
                resetGameRef.current();
            });
        
            // put group together (text + circle) and add to SVG
            group.appendChild(ball);
            group.appendChild(text);
            svgRef.current.appendChild(group);
        
            // store group + position, color data
            balls.push({ element: group, x, y, dx, dy, color });
        }
    }

    function moveBalls() {
        if (gameEndedRef.current) return; // balls stop moving at game end
    
        balls.forEach(ball => {
            ball.x += ball.dx;
            ball.y += ball.dy;
    
            // bounce ball off edges
            if (ball.x - radius.current <= 0 || ball.x + radius.current >= svgWidth.current) {
                ball.dx *= -1;
            }
            if (ball.y - radius.current <= 0 || ball.y + radius.current >= svgHeight.current) {
                ball.dy *= -1;
            }
    
            // move entire group (ball + text)
            ball.element.setAttribute('transform', `translate(${ball.x}, ${ball.y})`);
        });
    
        requestAnimationFrame(moveBalls);
    }
    /************** 
    GAME LOOP 
    ***************/
    resetGameRef.current = resetGame; // setting funct

    updateScores();
    stopGameRef.current = stopGame;
    setTargetColor();
    createBalls();
    moveBalls(); // Start movement

  }, []);

  return (
    <div id="appContainer">
      <Container fluid style={{ padding: 10 }}> {/* Game title, right/wrong msg */}
        <h2>Color Blindness - Round {roundNumber} of 4</h2>
        <p ref={resultMessageRef} id="resultMessage" aria-live="assertive"></p>
      </Container>
      
      <Container fluid>
        <Row>
          <Col className="text-end"><h3 ref={playerScoreRef} id="playerScore">Player: 0</h3></Col>
          <Col>
            {/* Trigger game ending when time bar reaches 0! */}
            <CountdownTimer initialTime={10} onComplete={() => stopGameRef.current()}/> 
          </Col>
          <Col className="text-start"><h3 ref={computerScoreRef} id="computerScore">Computer: 0</h3></Col>
        </Row>
      </Container>
      
      { /* Game msgs + canvas (SVG, announcements) */ }
      <h3 ref={targetColorTextRef} id="targetColorText" aria-live="assertive">Click the correct color ball</h3>

      <svg ref={svgRef} id="gameCanvas" preserveAspectRatio="xMidYMid meet" role="group" aria-labelledby="canvas-title">
        <title id="canvas-title">Game canvas with moving balls</title>
      </svg>

      { /* Game key */ }
      <div ref={gameKeyRef} id="gameKey"></div>

      { /* Game over modal */ }
      <Modal ref={gameOverPopupRef} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Time's Up!</Modal.Title>
        </Modal.Header>
        <Modal.Body><p>{gameOverMessage}</p></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Continue to Next Round</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ColorblindGame;