import sit_img from 'assets/img/ipc/sit.png';
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
                <Col md={6} sm={6} xs={6} className="mb-3">
                    <CardImg
                      className="card-img-left"
                      src={sit_img}
                      style={{ width: 'auto', height: 400, display: 'block', margin: 'auto'}}
                    />
                </Col>
                
                <Col md={6} sm={6} xs={6} className="mb-3">
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
                    <Col lg={12} md={12} sm={12} xs={12} className="mb-3">
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
        <Col xl={6} lg={12} md={12}>
            <Card className="mb-3">
              <CardHeader><h5><strong>Weekly Report</strong></h5></CardHeader>
              <CardBody>
                <Line data={genWeeklyData()} options={weeklyChartOption} />
              </CardBody>
            </Card>
        </Col>
        
        <Col md="6" sm="12" xs="12">
          <Row>
            <NumberWidget
              title="Stretches Done"
              number="20 Minutes"
              color="primary"
              progress={{
                value: 75,
                label: 'Completeness',
              }}
            />
          </Row>
          <br></br>
          <Row>
            <NumberWidget
              title="Walk"
              number="120 Minutes"
              color="info"
              progress={{
                value: 40,
                label: 'Completeness',
              }}
            />
          </Row>
          <br></br>
          <Row>
          <NumberWidget
              title="Good Posture"
              number="60%"
              color="success"
              progress={{
                value: 60,
                label: 'Completeness',
              }}
            />
          </Row>
          <br></br>
          <Row>
          <NumberWidget
              title="Bad Posture"
              number="40%"
              color="danger"
              progress={{
                value: 40,
                label: 'Completeness',
              }}
            />
          </Row>
        </Col>  
        </Row>  
        
        <Row>
        <Col xl={7} lg={12} md={12}>
          <Card>
            <CardHeader>Today Summary</CardHeader>
            <CardBody>
              <Pie data={genIpcPieData()} />
            </CardBody>
          </Card>
        </Col>
        <Col xl={5} lg={12} md={12}>
        <Card>
        <CardHeader><h5><strong>Your Today Stat</strong></h5></CardHeader>
          <Row>
          <Col lg={12} md={12} sm={12} xs={12} className="mb-3">
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
          <Col lg={12} md={12} sm={12} xs={12} className="mb-3">
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
          <Col lg={12} md={12} sm={12} xs={12} className="mb-3">
          <IconWidget
            bgColor="white"
            inverse={false}
            icon={MdShare}
            title="Walk"
            subtitle="15%"
          />
          </Col>
          </Row>
          <Row>
          <Col lg={12} md={12} sm={12} xs={12} className="mb-3">
          <IconWidget
            bgColor="white"
            inverse={false}
            icon={MdShare}
            title="Streches"
            subtitle="18%"
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
              src={sit_img}
              style={{ width: 'auto', height: 150 }}
            />
            <CardBody>
              <CardTitle>Horizontal Image Card(Left)</CardTitle>
              <CardText>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </CardText>
            </CardBody>
          </Card>
          <Card className="flex-row">
            <CardImg
              className="card-img-left"
              src={sit_img}
              style={{ width: 'auto', height: 150 }}
            />
            <CardBody>
              <CardTitle>Horizontal Image Card(Left)</CardTitle>
              <CardText>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
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
