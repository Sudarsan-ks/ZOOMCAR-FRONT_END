import React from "react";
import { Button, Form, Input, message, Row, Col, Select } from "antd";
import axios from "axios";
import { API } from "../../global.jsx";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

export function Register() {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            const res = await axios.post(`${API}/user/register`, values);
            message.success("Registered Successfully");
            localStorage.setItem("user_register_data", JSON.stringify(res.data.user));
            navigate("/");
        } catch (error) {
            message.error("This account is already registered");
        }
    };

    return (
        <>
            <Row>
                <Col lg={24} xs={24}>
                    <div className="RegisterFormpage">
                        <div className="Registerheading">
                            <p>WELCOME TO ZOOM CAR </p>
                        </div>
                        <div className="registerform">
                            <Form onFinish={onFinish}>
                                <Form.Item
                                    label="Username"
                                    name="username"
                                    className="registerUsername"
                                    rules={[
                                        { required: true, message: "Please enter a Username" }
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Email"
                                    name="email"
                                    className="registerEmail"
                                    rules={[
                                        { required: true, message: "Please enter a Email" },
                                        { type: "email", message: "Please enter a valid Email" },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Password"
                                    name="password"
                                    className="registerPassword"
                                    rules={[
                                        { required: true, message: "Please select your role a Password" },
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item
                                    label="Role"
                                    name="role"
                                    className="registerRole"
                                    rules={[{ required: true, message: 'Please select your role' }]}
                                >
                                    <Select >
                                        <Option value="user">User</Option>
                                        <Option value="admin">Admin</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="register-button"
                                    >
                                        Register
                                    </Button>
                                </Form.Item>

                            </Form>
                        </div>
                        <div className="registerDescription">
                            <span>
                                At Zoomcar, we prioritize the security and privacy of your personal information. We use advanced encryption and security protocols to protect your data during transmission and storage. Our stringent access controls ensure that only authorized personnel have access to your information.

                                We adhere to strict data protection standards and comply with all relevant regulations to safeguard your data. Your trust is important to us, and we are committed to maintaining the confidentiality and integrity of your information.

                                By logging in, you agree to our Privacy Policy and Terms of Use, where you can learn more about how we collect, use, and protect your data. If you have any questions or concerns, our support team is here to assist you. Thank you for choosing Zoomcar.
                            </span>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    );
}
