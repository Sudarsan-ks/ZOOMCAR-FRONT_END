import { useNavigate } from "react-router-dom";
import { Flex, Layout, TreeSelect, Skeleton, Row, Col, message } from 'antd';
import { API } from "../../global.jsx";
import axios from 'axios'
import { useState, useEffect } from 'react';
import { brand, tree, category, price, year, model } from "./data.jsx"
import { useSelector } from "react-redux";


const { Header, Sider, Content } = Layout;

export function ZoomCar() {

  const cartItem = useSelector((state) => state.Car.cartItem)
  const [carData, setCarData] = useState([]);
  const [search, setSearch] = useState("")
  const [searchvalues, setSearchvalues] = useState([])
  const [filtervalue, serFiltervalue] = useState()
  const navigate = useNavigate();
  const token = localStorage.getItem("token")

  const getVehicle = async () => {
    try {
      const vehicle = await axios.get(`${API}/vehicle/get-vehicle`, {
        headers: {
          Authorization: token
        }
      })
      setCarData(vehicle.data)
      setSearchvalues(vehicle.data)
    }
    catch (error) {
      console.log("Error in fetching all", error)
    }

  }
  useEffect(() => {
    getVehicle();
  }, []);


  const handleFilter = async (value) => {
    serFiltervalue(value)
    try {
      let vehicle;
      if (value == "all") {
        vehicle = await axios.get(`${API}/vehicle/get-vehicle`)
      }
      else if (brand(value)) {
        vehicle = await axios.get(`${API}/vehicle/get-vehicle/brand/${value}`)
      }
      else if (model(value)) {
        vehicle = await axios.get(`${API}/vehicle/get-vehicle/model/${value}`)
      }
      else if (category(value)) {
        vehicle = await axios.get(`${API}/vehicle/get-vehicle/category/${value}`)
      }
      else if (year(value)) {
        vehicle = await axios.get(`${API}/vehicle/get-vehicle/year/${value}`)
      }
      else if (price(value)) {
        vehicle = await axios.get(`${API}/vehicle/get-vehicle/price/${value}`)
      }
      else {
        console.log("Invalid filtering data")
        return;
      }
      setSearchvalues(vehicle.data)
    }
    catch (error) {
      console.log("Error while fetching the data")
    }

  };

  const handleSearch = (event) => {
    const SearchItem = event.target.value
    setSearch(SearchItem)
    filterSearchProduct(SearchItem)
  }

  const filterSearchProduct = (SearchItem) => {
    if (!SearchItem) {
      setSearchvalues(carData)
    }
    else {
      const filtersearch = carData.filter((item) =>
        item.brand.toLowerCase().includes(SearchItem.toLowerCase()) ||
        item.category.toLowerCase().includes(SearchItem.toLowerCase()) ||
        item.model.toLowerCase().includes(SearchItem.toLowerCase()) ||
        item.year.toString().includes(SearchItem.toLowerCase())
      )
      setSearchvalues(filtersearch)
    }
  }



  const handelBooknow = (bookitem) => {
    if (bookitem.length !== 0) {
      navigate("/booking", { state: { vehicle: bookitem._id, price: bookitem.pricePerDay, brand: bookitem.brand } })
    }
    else {
      navigate("/zoomcar")
    }
  }

  const haldleReview = (booking) => {
    if (booking.review.length !== 0) {
      navigate("/review/read-review", { state: { vehicleData: booking, brand: booking.brand } })
    }
    else {
      message.error("Please review the vehicle to view")
      navigate("/zoomcar")
    }
  }

  const handleLogout = () => {
    localStorage.clear()
    navigate("/")
  }

  const treeData = tree;

  return <>
    <Row>
      <Col lg={24} xs={24}>
        <div className="Zoomcarpage">
          <div className="zommcarproduct">
            <Flex gap="middle" wrap>
              <Layout className="layoutStyle">
                <Sider width="15%" className="siderStyle" >
                  <p>Filter</p>
                  <TreeSelect
                    className="filtering"
                    value={filtervalue}
                    dropdownStyle={{
                      maxHeight: 400,
                      overflow: 'auto',
                    }}
                    treeData={treeData}
                    placeholder="Please select"
                    treeDefaultExpandAll
                    onChange={handleFilter}
                  />
                </Sider>
                <Layout>
                  <Header className="headerStyle" >
                    <div className="search_box">
                      <div className="search-input">
                        <input type="text" placeholder="Search your desire car here" value={search} onChange={handleSearch} />
                      </div>
                    </div>
                    <div className="headings">
                      <p>ZOOM CAR</p>
                    </div>
                    <div className="bookinkCart">
                      <button type="button" className="btn btn-primary position-relative" onClick={() => {
                        if (cartItem.length == 0) {
                          alert("Please Book your Car to view the BOOKING")
                        }
                        else {
                          navigate("/booking/read-booking")
                        }
                      }} >
                        Book
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                          {cartItem.length}
                        </span>
                      </button>
                    </div>
                    <div className="logout-btn">
                      <i className="fa fa-sign-out" aria-hidden="true" onClick={() => handleLogout()} >Logout</i>
                    </div>
                  </Header>
                  <Content className="contentStyle" >
                    <div className="display-car" >
                      {searchvalues && searchvalues.length > 0 ? (
                        searchvalues.map((res) => (
                          <div className="productCard" key={res._id} >
                            <div className="image-brand-model">
                              <div className="productImage">
                                <img src={res.image} alt={res.brand} />
                              </div>
                              <div className="brand-model">
                                <div className="productBrand"><b>{res.brand}</b></div>
                                - <div className="productModel"><b>{res.model}</b></div>
                              </div>
                              <div className="review-button">
                                <button onClick={() => haldleReview(res)} ><u>reviews</u></button>
                              </div>
                            </div>
                            <div className="year-catego-price">
                              <div className="productYear"><b>YEAR</b> - <p><b>{res.year}</b></p></div>
                              <div className="productCategory"><b>{res.category}</b></div>
                              <div className="productPriceperday"><b>RENT PER DAY</b> -  <i className="fa fa-inr" aria-hidden="true"> <b>{res.pricePerDay}</b></i></div>
                              <div className="productButton">
                                <button onClick={() => handelBooknow(res)} >Book Now</button>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <Skeleton active />
                      )
                      }
                    </div>
                  </Content>
                </Layout>
              </Layout>
            </Flex>
          </div>
        </div>
      </Col>
    </Row>
  </>
}

