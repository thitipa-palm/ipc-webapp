import Page from 'components/Page';
import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Form,
  FormGroup,
  Input,
  Label,
  Table
} from 'reactstrap';
//import { Line } from 'react-chartjs-2';
import firebase from '../firebase';


// firebase.database().ref('current_id/').once('value', function(snap){
//   console.log(JSON.stringify(snap.val()))
// })
// console.log(firebase)
// console.log(database);
var starCountRef = firebase.database().ref();
starCountRef.on('value', (snapshot) => {
  const data = snapshot.val();
  console.log(data);
});



const DasPage = () => {
  const [formData, setFormData] = React.useState({
    patId: "",
  })
  const [query, setQuery] = React.useState({
    patId: "",
  })
  const [data, setData] = React.useState([{
    time:[],
    gyro_x: [],
    gyro_y: [],
    gyro_z: [],
    acc_x: [],
    acc_y: [],
    acc_z: [],
    distance: [],
    flex: [],
    date:[]
  }])
  React.useEffect(() => {
    firebase.database().ref('sensor')
      .on("value", (data) => {
        let tmpArr = []
        data.forEach(patient => {
          let tmpVal = patient.val()
          tmpArr.push({
            date: tmpVal.date,
            time: tmpVal.time,
            gyro_x: tmpVal.gyro_x,
            gyro_y: tmpVal.gyro_y,
            gyro_z: tmpVal.gyro_z,
            acc_x: tmpVal.acc_x,
            acc_y: tmpVal.acc_y,
            acc_z: tmpVal.acc_z,
            distance: tmpVal.distance,
            flex: tmpVal.flex
          })
        })
        setData(tmpArr)
      })
    return () => { }
  }, [query])

  const handleValueChange = (e, state) => {
    setFormData({
      ...formData,
      [state]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    //console.log(formData)
    setQuery(formData)
  }
  return (
    <Page
        title="Raw Gyroscope Data Tables"
        breadcrumbs={[{ name: 'gyro-tables', active: true }]}
        className="TablePage"
      >
      <Card>
        <CardHeader>Insert Patient ID to access Data</CardHeader>
        <CardBody>
          <Form>
            <FormGroup>
              <Label for="exampleSelect">Patient ID:</Label>
              <Input value={formData.patId} onChange={(e) => handleValueChange(e, "patId")} className="mb-2" />
            </FormGroup>
            <Label for="exampleSelect">Click for Search </Label>
            <br></br>
            <Button onClick={handleSubmit}>Search</Button>
          </Form>
        </CardBody>
      </Card>

      <br />

      <Card className="mb-3">
        <CardHeader>Gyroscope Raw Data</CardHeader>
        <CardBody>
          <Table {...{ 'striped': true }}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Gyro X</th>
                <th>Gyro Y</th>
                <th>Gyro Z</th>
              </tr>
            </thead>
            <tbody>
            {data.map(patient => {
                return (
                  <tr>
                    <td>{patient.date}</td>
                    <td>{patient.time}</td>
                    <td>{patient.gyro_x}</td>
                    <td>{patient.gyro_y}</td>
                    <td>{patient.gyro_z}</td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Page>
  );
};


export default DasPage;
