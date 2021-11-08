import { AnnouncementCard, TodosCard } from 'components/Card';
import user1Image from 'assets/img/users/100_1.jpg';
import { UserCard } from 'components/Card';
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
import { Bar, Line } from 'react-chartjs-2';
import {
  MdBubbleChart,
  MdInsertChart,
  MdPersonPin,
  MdPieChart,
  MdRateReview,
  MdShare,
  MdShowChart,
  MdThumbUp,
} from 'react-icons/md';
import InfiniteCalendar from 'react-infinite-calendar';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardDeck,
  CardGroup,
  CardHeader,
  CardTitle,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
  Form,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  Label,
} from 'reactstrap';
import { getColor } from 'utils/colors';

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
        title="Profile"
        breadcrumbs={[{ name: 'Profile', active: true }]}
      >
      <Row>
      <Col md={3}></Col>
      
      <Col md={6}>
        <Row>
        <Col md={12}>
          <UserCard
            avatar={user1Image}
            title="John Pik"
            subtitle="Project Lead"
            text="Give me a star!"
            style={{
              height: 200,
            }}
          />
        </Col>
        </Row>
        
        <Row>
        <Col md={12}>
          <Card>
            <CardHeader>Your Info</CardHeader>
            <CardBody>
              <Form>
                <FormGroup row>
                <Label for="exampleEmail" sm={2}> Age </Label>
                  <Col sm={10}>
                    <Input
                        plaintext
                        value="34 years old"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                <Label for="exampleEmail" sm={2}> Weight </Label>
                  <Col sm={10}>
                    <Input
                        plaintext
                        value="63 Kg."
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                <Label for="exampleEmail" sm={2}> Height </Label>
                  <Col sm={10}>
                    <Input
                        plaintext
                        value="183 Cm"
                    />
                  </Col>
                </FormGroup>
          
            <FormGroup>
            <Row>
                <Label for="exampleEmail" sm={12}> Preferred Exercise/ Activity</Label>
            </Row>
            <Row>
                <Col md={1}></Col>
                <Col md={10}>
              <Button color="primary" className="mr-2 mb-2">
                Yoga 
              </Button>
              <Button color="info"  className="mr-2 mb-2">
                Body Weight 
              </Button>
              <Button color="primary" outline className="mr-2 mb-2">
                Basketball 
              </Button>
              <Button color="info" className="mr-2 mb-2">
                Volleyball 
              </Button>
              <Button color="secondary" outline className="mr-2 mb-2">
                Run 
              </Button>
              </Col>
              <Col md={1}></Col>
              </Row>

              <Row>
              <Col md={1}></Col>
              <Col md={10}>
              <Button color="primary" outline className="mr-2 mb-2">
                Cycle 
              </Button>
              <Button color="info" className="mr-2 mb-2">
                Swimming 
              </Button>
            
              <Button color="primary" outline className="mr-2 mb-2">
                Pilates 
              </Button>
              <Button color="info" className="mr-2 mb-2">
                Meditation 
              </Button>
              <Button color="secondary" outline className="mr-2 mb-2">
                Cardio 
              </Button>
              </Col>
              <Col md={1}></Col>
              </Row>
              </FormGroup>

              <FormGroup row>
                <Label for="exampleEmail" sm={2}> Serial Number</Label>
                  <Col sm={10}>
                    <Input
                        plaintext
                        value="736-2934-8561-03"
                    />
                  </Col>
                </FormGroup>
            
                
                <FormGroup check row>
                  <Col sm={{ size: 10, offset: 2 }}>
                    <Button>Edit Profile</Button>
                  </Col>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>
        </Row>
        </Col>
        
        <Col md={3}></Col>
      </Row>

      
      
      </Page>
    );
  }
}
export default DashboardPage;
