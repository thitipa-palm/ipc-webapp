//import pic - there should be more effective way to do this but...
import sit_img from 'assets/img/ipc/sit.png';
import strech1_img from 'assets/img/ipc/strech1.jpg';
import strech2_img from 'assets/img/ipc/strech2.jpg';
import strech3_img from 'assets/img/ipc/strech3.jpg';
import strech4_img from 'assets/img/ipc/strech4.jpg';

import { AnnouncementCard, TodosCard } from 'components/Card';
import HorizontalAvatarList from 'components/HorizontalAvatarList';
import MapWithBubbles from 'components/MapWithBubbles';
import Page from 'components/Page';
import ProductMedia from 'components/ProductMedia';
import SupportTicket from 'components/SupportTicket';
import UserProgressTable from 'components/UserProgressTable';
import { IconWidget, NumberWidget } from 'components/Widget';
import { getStackLineChart, stackLineChartOptions } from 'demos/chartjs';
import {
  avatarsData,
  chartjs,
  productsData,
  supportTicketsData,
  todosData,
  userProgressTableData,
} from 'demos/dashboardPage';
import React from 'react';
import { Bar, Line, Doughnut, Pie } from 'react-chartjs-2';
import {
  MdBubbleChart,
  MdInsertChart,
  MdPersonPin,
  MdPieChart,
  MdRateReview,
  MdShare,
  MdShowChart,
  MdThumbUp,
  MdThumbDown,
  MdLightbulbOutline
} from 'react-icons/md';
import InfiniteCalendar from 'react-infinite-calendar';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardDeck,
  CardGroup,
  CardHeader,
  CardTitle,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
  CardImgOverlay,
  Progress,
} from 'reactstrap';
import { getColor } from 'utils/colors';
import {TablePage, genWeeklyData, weeklyChartOption} from 'pages/SamplePage';
import {genIpcPieData} from 'pages/ChartPage';
import firebase from '../firebase.js';

const dbRef = firebase.database().ref();
console.log(dbRef)
dbRef.child("sensor").get().then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});

//Edit Todo list Data here//
const ipctodosData = [
  { id: 1, title: 'Stand up' },
  { id: 2, title: 'Upper-body Stretch'},
  { id: 3, title: 'Daily Walk'},
  { id: 4, title: 'Go Jogging :)'},
  { id: 5, title: 'Fix Your Posture '},
];


const today = new Date();
const lastWeek = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 7,
);

class DashboardPage extends React.Component {
  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
  }

  render() {
    const primaryColor = getColor('primary');
    const secondaryColor = getColor('secondary');

    return (
      <Page
        className="DashboardPage"
        title="Dashboard"
        breadcrumbs={[{ name: 'Dashboard', active: true }]}
      >
        <Row>
        <Col md={12} sm={12} xs={12} className="mb-3">
          <Card className="flex-row">
                <Col md={6} sm={6} xs={6} className="m-5">
                    <CardImg
                      className="card-img-left"
                      src={sit_img}
                      style={{ width: 'auto', height: 350, display: 'block', margin: 'auto'}}
                    />
                </Col>
                
                <Col md={6} sm={6} xs={6} className="m-3">
                  <CardBody>
                    <CardTitle>
                      <h3 class="text-center">
                        <strong>You are currently :</strong>
                      </h3>
                    </CardTitle>
                    <CardText>
                      <h1 class="text-center">
                          <strong>Sitting</strong>
                      </h1>
                    </CardText>
                      <br></br>
                      <br></br>
                  <Row>
                    <Col md={10} sm={10} xs={10} className="m-3">
                      <IconWidget
                        bgColor={'success'}
                        icon={MdThumbUp}
                        title={<h4 class="text-center"> <strong> Very Good John </strong> </h4>}
                        subtitle={<h5 class="text-center">  Good Posture!  </h5>}
                      />
                    </Col>
                  </Row>  
                  </CardBody>
                </Col>
              
          </Card>
        </Col>
        </Row>
        <Row>
        <Col md={12} sm={12} xs={12} className="mb-3">
          <Card className="flex-row">
            <CardBody>
              <CardTitle><h4> <strong>Real time suggestion</strong></h4></CardTitle>
              <CardText>
              Increase awareness of posture and ergonomics in everyday settings Becoming aware of posture and ergonomics at work,
              at home, and at play is a vital step towards instilling good posture and ergonomic techniques.
              </CardText>
            </CardBody>
          </Card>
        </Col>
        </Row>

        <Row>
        <Col xl={7} lg={12} md={12}>
          <Card>
            <CardHeader><h5><strong>Today Summary</strong></h5></CardHeader>
            <CardBody>
              <Pie data={genIpcPieData()} />
            </CardBody>
          </Card>
        </Col>
        
        <Col xl={5} lg={12} md={12}>
        <Card>
        <CardHeader><h5><strong>Your Today Stats</strong></h5></CardHeader>
          <Row>
          <Col lg={12} md={12} sm={12} xs={12} className="mt-0">
          <IconWidget
            bgColor="white"
            inverse={false}
            icon={MdThumbUp}
            title="Good Posture"
            subtitle="41%"
          />
          </Col>
          </Row>
          <Row>
          <Col lg={12} md={12} sm={12} xs={12} className="mt-3">
          <IconWidget
            bgColor="white"
            inverse={false}
            icon={MdThumbDown}
            title="Bad Posture"
            subtitle="26%"
          />
          </Col>
          </Row>
          
          <Row>
              <Col lg={12} md={12} sm={12} xs={12} className="mt-3">
                <IconWidget
                  bgColor={'success'}
                  icon={MdLightbulbOutline}
                  title={<h4 class="text-center"> <strong> Nice posture! </strong> </h4>}
                  subtitle={<h5 class="text-center">  You did good today  </h5>}
                />
              </Col>
          </Row> 
          </Card>
        </Col>
        </Row>

        <Row>
        <Col xl={6} lg={12} md={12}>
            <Card className="mb-3">
              <CardHeader><h5><strong>Activity History</strong></h5></CardHeader>
              <CardBody>
                <Line data={genWeeklyData()} options={weeklyChartOption} />
              </CardBody>
            </Card>
        </Col>
        
        <Col md="6" sm="12" xs="12">
        <Card>
        <CardHeader><h5><strong>Weekly Progress</strong></h5></CardHeader>
          <Row>
            <Col md="12" sm="12" xs="12">
            <NumberWidget
              title="Stretches Done"
              number="20 Minutes"
              color="primary"
              progress={{
                value: 75,
                label: 'Completeness',
              }}
            />
            </Col>
          </Row>
          <Row>
          <Col md="12" sm="12" xs="12">
            <NumberWidget
              title="Walk"
              number="120 Minutes"
              color="info"
              progress={{
                value: 40,
                label: 'Completeness',
              }}
            />
          </Col>
          </Row>
          
          <Row>
          <Col md="12" sm="12" xs="12">
          <NumberWidget
              title="Good Posture"
              number="60%"
              color="success"
              progress={{
                value: 60,
                label: 'Completeness',
              }}
            />
          </Col>
          </Row>
          <Row>
          <Col md="12" sm="12" xs="12">
          <NumberWidget
              title="Bad Posture"
              number="40%"
              color="danger"
              progress={{
                value: 40,
                label: 'Completeness',
              }}
            />
          </Col>
          </Row>
          </Card>
        </Col>  
        </Row>  

        <Row> 
        <Col lg="12" md="12" sm="12" xs="12">
        <CardHeader><h5><strong>To-Do List</strong></h5></CardHeader>
            <TodosCard todos={ipctodosData} />
          </Col>
        </Row>
        
        <Row>
        <Col xl={12} lg={12} md={12}>
        <CardHeader><h5><strong>Recommendations</strong></h5></CardHeader>
          <Card className="flex-row">
            <CardImg
              className="card-img-left"
              src={strech2_img}
              style={{ width: 'auto', height: 150 }}
            />
            <CardBody>
              <CardTitle><h7><strong>Hamstrings</strong></h7>
                <Badge color="primary" className="m-1">
                  Yoga
                </Badge>
              </CardTitle>
              <CardText>
              Stand split stance and put both of your hands on the knee in front
               of you and keep the other knee straight, push your hip forwards and down 
               keeping your back straight.Place the hands on the top of the hip for support. 
               Hold the stretch for 30 seconds and then switch to other side and repeat the steps.
              </CardText>
            </CardBody>
          </Card>
          <Card className="flex-row">
            <CardImg
              className="card-img-left"
              src={strech1_img}
              style={{ width: 'auto', height: 150 }}
            />
            <CardBody>
              <CardTitle><h7><strong>Upper Back Stretch</strong></h7>
              <Badge color="info" className="m-1">
                  Body Weight
                </Badge>
                <Badge color="primary" className="m-1">
                  Yoga
                </Badge>
                </CardTitle>
                
              <CardText>
              interlock your fingers behind your back, then lift your arms so you feel a 
              stretch in your chest and front shoulders. Draw your chin down to avoid crunching the neck.
              </CardText>
            </CardBody>
          </Card>
          <Card className="flex-row">
            <CardImg
              className="card-img-left"
              src={strech3_img}
              style={{ width: 'auto', height: 150 }}
            />
            <CardBody>
              <CardTitle><h7><strong>Wrists and forearm</strong></h7>
              <Badge color="warning" className="m-1">
                  Meditaion
                </Badge>
                <Badge color="primary" className="m-1">
                  Yoga
                </Badge>
              </CardTitle>
              <CardText>
              Perform a prayer stretch (Buddha stretch) by placing your fingers and palms 
              together with your hands in front of your chest and fingers pointing upward. 
              While keeping your palms together and having your elbows away from the body, 
              you should slowly lower your hands until you feel a good stretch around your wrists. 
              Hold for five seconds.
              </CardText>
            </CardBody>
          </Card>
          <Card className="flex-row">
            <CardImg
              className="card-img-left"
              src={strech4_img}
              style={{ width: 'auto', height: 150 }}
            />
            <CardBody>
              <CardTitle><h7><strong>Hip Flexors</strong></h7>
                <Badge color="success" className="m-1">
                  Cardio
                </Badge>
                </CardTitle>
              <CardText>
              Stand tall with back straight, abs engaged, shoulders down, and feet hip-width apart. 
              Bring your left leg forward, heel down, toes up and leg straight. Keeping back straight 
              and abs engaged, bend the right knee as if sitting back, while supporting yourself with 
              both hands on your thighs. Breathe deeply and hold for 10-30 seconds. Switch legs and repeat 
              on the other side.
              </CardText>
            </CardBody>
          </Card>
        </Col>
        </Row>
       
      </Page>
    );
  }
}
export default DashboardPage;
