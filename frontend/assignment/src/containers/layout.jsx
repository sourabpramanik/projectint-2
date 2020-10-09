import React from 'react';
import ImageGridList from "../Components/imagesList";
import SearchForm from "../Components/searchForm";
import axios from "axios";
import { Button } from "@material-ui/core";
import { Layout, Menu} from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';

const { Header, Content} = Layout;
class CustomLayout extends React.Component{
    constructor() {
        super();
        this.state = {
            images: [],
            isLoaded: false,
            query: "Editorial",
            active: "Editorial",
            background: '',
        };
    }

    componentDidMount() {
        this.imageSearch();
        axios.get(`https://api.nasa.gov/planetary/apod?api_key=ubTNhbfztJyZsy5OOgfH1W37HeqXpIG7CxbT6oko`)
        .then((res) => {
            this.setState({background: res.data.hdurl});
        });
        
    }
    componentWillReceiveProps(newProps){
        console.log(newProps);
        if(newProps.token){
            axios.defaults.header = {
                "Content-type": "application/json",
                Authorization: this.props.token,
            }
            
        }
        
    } 
       
    
    componentDidUpdate(prevProps, prevState) {
        if (prevState.query !== this.state.query) {
            this.imageSearch();
        }
    }

    onSubmit = (search) => {
        this.setState({ query: search });
        this.setState({ active: search });
    };
    onCollectionSubmit = (id) => {
        console.log(id);
        axios
            .get(
                `https://api.unsplash.com/collections/${id}/photos?client_id=wuq1Fw10R6HLmkRHRy-aMA1Dqn2iBxRHWOF_RG8X_H8`
            )
            .then((data) => {
                this.setState({ images: data.data, isLoaded: true });
                this.setState({ active: `Collection ${id}` });
            });
    };
    imageSearch = () => {
        const unsplashApi = "wuq1Fw10R6HLmkRHRy-aMA1Dqn2iBxRHWOF_RG8X_H8";
        const q = this.state.query;
        if (q.length > 0) {
            axios
                .get(
                    `https://api.unsplash.com/search/photos/?per_page=100&query=${q}&client_id=${unsplashApi}&count=10`
                )
                .then((data) => {
                    this.setState({ images: data.data.results, isLoaded: true });
                });
        }
    };

    render() {
        return (
            <Layout className="layout" >
               
                <Header>
                    <div className="logo" />
                    
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item>
                            <h1 className="title" style={{ fontWeight: 'bolder', color: 'white' }}>UNSPLASH</h1>
                        </Menu.Item>

                        {
                            this.props.isAuthenticated ?

                                <Menu.Item key="2" onClick={this.props.logout} style={{left: '80%'}}>
                                    Logout  
                                </Menu.Item>
                                


                                :

                                <Menu.Item key="2" style={{ left: '80%' }} >
                                    <Link to="/login">Login</Link>
                                </Menu.Item>
                                

                                
                        }
                        
                    </Menu>
                </Header>
                {this.props.isAuthenticated?
                    <Content style={{
                        backgroundImage: "url(" + this.state.background + ")",
                        backgroundPosition: "center",
                        backgroundSize: "100%",
                        backgroundRepeat: "no-repeat",
                        backgroundAttachment: "fixed",
                        padding: '0 50px'
                    }}>
                        
                        <div className="App">
                            <div className="title" style={{textAlign: 'center', paddingTop: '25px',}}>
                                <Button onClick={() => this.onCollectionSubmit(1580860)}>
                                    Collection 1
                            </Button>
                                <Button onClick={() => this.onCollectionSubmit(139386)}>
                                    Collection 2
                            </Button>
                                <Button onClick={() => this.onCollectionSubmit(2274400)}>
                                    Collection 3
                            </Button>
                                <Button onClick={() => this.onCollectionSubmit(322750)}>
                                    Collection 4
                            </Button>
                                <Button onClick={() => this.onCollectionSubmit(4329266)}>
                                    Collection 5
                            </Button>
                                <Button onClick={() => this.onCollectionSubmit(1300447)}>
                                    Collection 6
                            </Button>
                            </div>

                            <SearchForm
                                query={this.state.query}
                                onSubmit={this.onSubmit}
                                onSearch={this.imageSearch}
                            />
                            <br/>
                            <ImageGridList images={this.state.images} style={{background: 'none'}} />
                        </div>
                    </Content>
                    :
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                        {this.props.children}
                    </div>
                    
                    
                }

            </Layout>
            
        );
    }
}
const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())       
    }
};

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

    export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomLayout));