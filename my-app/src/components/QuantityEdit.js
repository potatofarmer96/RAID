import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,

  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function QuantityEdit() {
  //defining the state of a form 
  const [form, setForm] = useState({
    apple: 0,
    banana: 0,
    pear: 0,
    orange: 0,
  });

  //by default the status of successmessage is false
  const [successMessage, setSuccessMessage] = useState(false);

  //handle submit
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      apple: form.apple,
      banana: form.banana,
      pear: form.pear,
      orange: form.orange,
      totalPrice: parseFloat(totalPrice())
    }

    const apiUrl = 'http://localhost:3001/purchase';

    console.log('Data to send', data);
    console.log('Request URL', apiUrl);

    //the put api when submitting for updating inventory
    axios.put(apiUrl, data)
      .then((response) => {
        console.log('PUT request successful:', response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    //this is for storing the transaction into the db
    axios.post(apiUrl, data)
      .then((response) => {
        setSuccessMessage(true);
        setTimeout(() => setSuccessMessage(false), 3000); // Show for 3 seconds
        console.log('POST request successful:', response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    // Reset the form inputs by setting the state to their initial values
    setForm({ apple: 0, banana: 0, pear: 0, orange: 0, totalPrice:0 });
    // window.location.reload();

    // console.log("cmy data",form);
    // Use useEffect to log the form state after it has been reset


    // Reset the form inputs by setting the state to their initial values
    // setForm({ apple: 0, banana: 0, pear: 0, orange: 0 });
    // console.log("Form after reset", form);
  }
  // Reset the form inputs by setting the state to their initial values


  //calculate total price
  const totalPrice = () => {
    const hashMap = {
      apple: 2.00,
      banana: 1.50,
      pear: 2.30,
      orange: 1.80,
    };

    return (
      form.apple * hashMap.apple +
      form.banana * hashMap.banana +
      form.pear * hashMap.pear +
      form.orange * hashMap.orange
    ).toFixed(2); // To display the total price with 2 decimal places
  }

  //this data is used for getting inventory 
  const [data, setData] = useState([]);
  useEffect(() => {
    // Make a GET request to your Express.js backend endpoint
    axios.get('http://localhost:3001/getInventory') // api call
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

  }, [data]);

  //used to pull out the total revenue
  const [revenuedata, setRevenueData] = useState(0);
  //making a GET request
  useEffect(() => {
    axios.get('http://localhost:3001/getTotalRevenue')
      .then((response) => {
        setRevenueData(response.data[0]);
        // console.log('CMY Data',response)
        // console.log('CMY Data1',data)
      })
      .catch((error) => {
        console.error('Error fetching data', error);
      });
  }, [revenuedata])

  return (
    <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
      <form onSubmit={handleSubmit}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol size="12">
              <MDBCard className="card-registration card-registration-2" style={{ borderRadius: "15px" }}>
                <MDBCardBody className="p-0">
                  <MDBRow className="g-0">
                    <MDBCol lg="8">
                      <div className="p-5">
                        <div className="d-flex justify-content-between align-items-center mb-5">
                          <MDBTypography tag="h1" className="fw-bold mb-0 text-black">
                            Jenny's Fruit Shop
                          </MDBTypography>
                          <MDBTypography className="mb-0 text-muted">
                            4 items
                          </MDBTypography>
                        </div>

                        <hr className="my-4" />

                        <MDBRow className="mb-4 d-flex justify-content-between align-items-center">
                          <MDBCol md="2" lg="2" xl="2">
                            <MDBCardImage
                              src="https://healthjade.com/wp-content/uploads/2017/10/apple-fruit.jpg"
                              fluid className="rounded-3" alt="Apple" />
                          </MDBCol>
                          <MDBCol md="3" lg="3" xl="3">
                            <MDBTypography tag="h6" className="text-muted">
                              Fruit
                            </MDBTypography>
                            <MDBTypography tag="h6" className="text-black mb-0">
                              Apple
                            </MDBTypography>
                          </MDBCol>
                          <MDBCol md="3" lg="3" xl="3" className="d-flex align-items-center">
                            <MDBBtn color="link" className="px-2">
                              <MDBIcon fas icon="minus" />
                            </MDBBtn>

                            <MDBInput type="number" min="0" value={form.apple} size="m" onChange={(event) => setForm({ ...form, apple: parseInt(event.target.value) })} />

                            <MDBBtn color="link" className="px-2">
                              <MDBIcon fas icon="plus" />
                            </MDBBtn>
                          </MDBCol>
                          <MDBCol md="3" lg="2" xl="2" className="text-end">
                            <MDBTypography tag="h6" className="mb-0">
                              $ 2.00
                            </MDBTypography>
                          </MDBCol>
                          <MDBCol md="1" lg="1" xl="1" className="text-end">
                            <a href="#!" className="text-muted">
                              <MDBIcon fas icon="times" />
                            </a>
                          </MDBCol>
                        </MDBRow>

                        <hr className="my-4" />

                        <MDBRow className="mb-4 d-flex justify-content-between align-items-center">
                          <MDBCol md="2" lg="2" xl="2">
                            <MDBCardImage
                              src="https://th-thumbnailer.cdn-si-edu.com/4Nq8HbTKgX6djk07DqHqRsRuFq0=/1000x750/filters:no_upscale()/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/d5/24/d5243019-e0fc-4b3c-8cdb-48e22f38bff2/istock-183380744.jpg"
                              fluid className="rounded-3" alt="Banana" />
                          </MDBCol>
                          <MDBCol md="3" lg="3" xl="3">
                            <MDBTypography tag="h6" className="text-muted">
                              Fruit
                            </MDBTypography>
                            <MDBTypography tag="h6" className="text-black mb-0">
                              Banana
                            </MDBTypography>
                          </MDBCol>
                          <MDBCol md="3" lg="3" xl="3" className="d-flex align-items-center">
                            <MDBBtn color="link" className="px-2">
                              <MDBIcon fas icon="minus" />
                            </MDBBtn>

                            <MDBInput type="number" min="0" value={form.banana} size="m" onChange={(event) => setForm({ ...form, banana: parseInt(event.target.value) })} />

                            <MDBBtn color="link" className="px-2">
                              <MDBIcon fas icon="plus" />
                            </MDBBtn>
                          </MDBCol>
                          <MDBCol md="3" lg="2" xl="2" className="text-end">
                            <MDBTypography tag="h6" className="mb-0">
                              $ 1.50
                            </MDBTypography>
                          </MDBCol>
                          <MDBCol md="1" lg="1" xl="1" className="text-end">
                            <a href="#!" className="text-muted">
                              <MDBIcon fas icon="times" />
                            </a>
                          </MDBCol>
                        </MDBRow>

                        <hr className="my-4" />

                        <MDBRow className="mb-4 d-flex justify-content-between align-items-center">
                          <MDBCol md="2" lg="2" xl="2">
                            <MDBCardImage
                              src="https://images.squarespace-cdn.com/content/v1/5d72fd37e5a0a8662ab46e6f/1570828641830-DDCED52ULP1YG95MC4R3/Pear_Whole.jpg?format=750w"
                              fluid className="rounded-3" alt="Pear" />
                          </MDBCol>
                          <MDBCol md="3" lg="3" xl="3">
                            <MDBTypography tag="h6" className="text-muted">
                              Fruit
                            </MDBTypography>
                            <MDBTypography tag="h6" className="text-black mb-0">
                              Pear
                            </MDBTypography>
                          </MDBCol>
                          <MDBCol md="3" lg="3" xl="3" className="d-flex align-items-center">
                            <MDBBtn color="link" className="px-2">
                              <MDBIcon fas icon="minus" />
                            </MDBBtn>

                            <MDBInput type="number" min="0" value={form.pear} size="m" onChange={(event) => setForm({ ...form, pear: parseInt(event.target.value) })} />

                            <MDBBtn color="link" className="px-2">
                              <MDBIcon fas icon="plus" />
                            </MDBBtn>
                          </MDBCol>
                          <MDBCol md="3" lg="2" xl="2" className="text-end">
                            <MDBTypography tag="h6" className="mb-0">
                              $2.30
                            </MDBTypography>
                          </MDBCol>
                          <MDBCol md="1" lg="1" xl="1" className="text-end">
                            <a href="#!" className="text-muted">
                              <MDBIcon fas icon="times" />
                            </a>
                          </MDBCol>
                        </MDBRow>

                        <hr className="my-4" />

                        <MDBRow className="mb-4 d-flex justify-content-between align-items-center">
                          <MDBCol md="2" lg="2" xl="2">
                            <MDBCardImage
                              src="https://cdn.pixabay.com/photo/2016/02/23/17/42/orange-1218158_1280.png"
                              fluid className="rounded-3" alt="Orange" />
                          </MDBCol>
                          <MDBCol md="3" lg="3" xl="3">
                            <MDBTypography tag="h6" className="text-muted">
                              Fruit
                            </MDBTypography>
                            <MDBTypography tag="h6" className="text-black mb-0">
                              Orange
                            </MDBTypography>
                          </MDBCol>
                          <MDBCol md="3" lg="3" xl="3" className="d-flex align-items-center">
                            <MDBBtn color="link" className="px-2">
                              <MDBIcon fas icon="minus" />
                            </MDBBtn>

                            <MDBInput type="number" min="0" value={form.orange} size="m" onChange={(event) => setForm({ ...form, orange: parseInt(event.target.value) })} />

                            <MDBBtn color="link" className="px-2">
                              <MDBIcon fas icon="plus" />
                            </MDBBtn>
                          </MDBCol>
                          <MDBCol md="3" lg="2" xl="2" className="text-end">
                            <MDBTypography tag="h6" className="mb-0">
                              $1.80
                            </MDBTypography>
                          </MDBCol>
                          <MDBCol md="1" lg="1" xl="1" className="text-end">
                            <a href="#!" className="text-muted">
                              <MDBIcon fas icon="times" />
                            </a>
                          </MDBCol>
                        </MDBRow>

                        <hr className="my-4" />

                        <MDBCol>
                          <div className="d-flex justify-content-between mb-5">
                            <MDBTypography tag="h5" className="text-uppercase">
                              Total price
                            </MDBTypography>
                            <MDBTypography tag="h5">$ {totalPrice()}</MDBTypography>

                            <button type="submit" className="btn btn-dark btn-lg">Purchase</button>
                          </div>
                        </MDBCol>

                        <hr className="my-4" />

                        <div className="pt-5">
                          <MDBTypography tag="h6" className="mb-0">
                            {successMessage && (
                              <div className="row">
                                <div className="col-auto">
                                  <div className="alert alert-success">Success: Purchase was successful!</div>
                                </div>
                              </div>
                            )}

                          </MDBTypography>
                        </div>
                      </div>
                    </MDBCol>
                    <MDBCol lg="4" className="bg-grey">
                      <div className="p-5">
                        <MDBTypography tag="h3" className="fw-bold mb-5 mt-2 pt-1">
                          Inventory
                        </MDBTypography>

                        <hr className="my-4" />

                        <div className="d-flex justify-content-between mb-4">
                          <table className="table table-bordered table-hover">
                            <thead>
                              <tr>
                                <th>Item</th>
                                <th>Quantity</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data.map((item) => (
                                <tr key={item.id}>
                                  <td>{item.fruit_name}</td>
                                  <td>{item.quantity}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>

                        </div>

                        <hr className="my-4" />

                        <div className="d-flex justify-content-between mb-5">
                          <MDBTypography tag="h5" className="text-uppercase">
                            Total Revenue
                          </MDBTypography>
                          <MDBTypography tag="h5">${revenuedata.total_price}</MDBTypography>
                        </div>

                      </div>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </form>
    </section>
  );
}