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
import ButtonPage from 'pages/ButtonPage';

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

// class ButtonPage extends React.Component{

// }

//Edit Todo list Data here//
const ipctodosData = [
  { id: 1, title: "Don't forget to stand up every 2 hours"},
  { id: 2, title: 'Have you done your daily upper-body stretch? - Check the recommendation to see our tailored stretch for you.'},
  { id: 3, title: "A good walk a day, keeps the doctor away!"},
  { id: 4, title: "You should jogg at least 3 time this week. YOU CAN DO IT!"},
  { id: 5, title: "Be mindfulness on your posture."},
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

  state = {
    rSelected: null,
    cSelected: [],
  };
  
  onCheckboxBtnClick(selected) {
    const index = this.state.cSelected.indexOf(selected);
    if (index < 0) {
      this.state.cSelected.push(selected);
    } else {
      this.state.cSelected.splice(index, 1);
    }
    this.setState({ cSelected: [...this.state.cSelected] });
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
                <Col md={4} sm={6} xs={6} className="m-3">
                    <CardImg
                      className="card-img-left"
                      src={sit_img}
                      style={{ width: 'auto', height: 300, display: 'block', margin: 'auto', marginBottom: '20px'}}
                    />
                    <CardTitle>
                      <h3 class="text-center">
                        <strong>You have been :</strong>
                      </h3>
                    </CardTitle>
                    <CardText>
                      <h1 class="text-center">
                          <strong>Sitting</strong> 
                      </h1>
                      <h4 class="text-center">for 4 hours</h4>
                    </CardText>
                </Col>
                
                <Col md={8} sm={6} xs={6} className="m-5">
                  <Row>
                    <Col md={10} sm={10} xs={10} className="m-5">
                      <IconWidget
                        bgColor={'danger'}
                        icon={MdThumbDown}
                        title={<h3 class="text-center"> <strong> Sit too long </strong> </h3>}
                        subtitle={<h4 class="text-center">You should try standing up and relax for 5 minutes.</h4>}
                      />
                      <Card className="flex">
                        <CardBody>
                          <CardTitle><h4> <strong>Real time suggestion</strong></h4></CardTitle>
                          <CardText>
                          You have been stting for to long, that is unhealty for your lower back and blood circulation in
                          your appendage. We suggest to try standing up and relax your body for at least 5 minutes. 
                          </CardText>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>  
                </Col>
          </Card>
        </Col>
        </Row>
        
        <Row> 
        <Col lg="12" md="12" sm="12" xs="12">
        <Card>
        <CardHeader><h5><strong>Weekly Reminder</strong> </h5> <h6>This is generated base on your past 7 days activities. Here is what we suggest you to do in this week.</h6></CardHeader>
          <CardBody>
                <Col md={12}>
                  <Row>
                    <Col lg="6" md="12" sm="12" xs="12">
                      <Button color="primary" size="lg" block
                      onClick={() => this.onCheckboxBtnClick(1)}
                      active={this.state.cSelected.includes(1)}>
                      Don't forget to stand up every 2 hours
                      </Button>
                      <Button color="primary" size="lg" block
                      onClick={() => this.onCheckboxBtnClick(2)}
                      active={this.state.cSelected.includes(2)}>
                      Have you done your daily upper-body stretch? - Check the recommendation to see our tailored stretch for you.
                      </Button>
                      <Button color="primary" size="lg" block
                      onClick={() => this.onCheckboxBtnClick(3)}
                      active={this.state.cSelected.includes(3)}>
                      A good walk a day, keeps the doctor away!
                      </Button>
                    </Col>
                    <Col lg="6" md="12" sm="12" xs="12">
                      <Button color="primary" size="lg" block
                      onClick={() => this.onCheckboxBtnClick(5)}
                      active={this.state.cSelected.includes(5)} >
                      Be mindfulness on your posture.
                      </Button>
                      <Button color="primary" size="lg" block
                      onClick={() => this.onCheckboxBtnClick(6)}
                      active={this.state.cSelected.includes(6)}>
                      You should jogg at least 3 time this week. YOU CAN DO IT!
                      </Button>
                      <Button color="primary" size="lg" block
                      onClick={() => this.onCheckboxBtnClick(7)}
                      active={this.state.cSelected.includes(7)}>
                      30 minutes of cardio can impove your overall health - Check the recommendation to see our tailored cardio for you.
                      </Button>
                    </Col>
                  </Row>
                </Col>
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
