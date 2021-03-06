import { useParams } from 'react-router-dom';
import { Footer } from "../../../components/footer/Footer";
import { NavBar } from "../../../components/navBar/NavBar";

type userParams = {
    id: string;
}


export function VisualizarProfile(){
    const params = useParams<userParams>();
    const profileID = params.id;
    
    return(
        <div className="d-flex flex-column min-vh-100">
            <NavBar/>

            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-md-7 col-lg-4 mb-5 mb-lg-0 wow fadeIn">
                        <div className="card border-0 shadow">
                            <img src={"https://www.bootdey.com/img/Content/avatar/avatar6.png"} alt="" />
                            <div className="card-body p-1-9 p-xl-5">
                                <div className="mb-4">
                                    <h3 className="h4 mb-0">Dakota Johnston</h3>
                                    <span className="text-primary">CEO &amp; Founder</span>
                                </div>
                                <ul className="list-unstyled mb-4">
                                    <li className="mb-3"><a href="#!"><i className="far fa-envelope display-25 me-3 text-secondary"></i>dakota@gmail.com</a></li>
                                    <li className="mb-3"><a href="#!"><i className="fas fa-mobile-alt display-25 me-3 text-secondary"></i>+012 (345) 6789</a></li>
                                    <li><a href="#!"><i className="fas fa-map-marker-alt display-25 me-3 text-secondary"></i>205 Main Street, USA</a></li>
                                </ul>
                                <ul className="social-icon-style2 ps-0">
                                    <li><a href="#!" className="rounded-3"><i className="fab fa-facebook-f"></i></a></li>
                                    <li><a href="#!" className="rounded-3"><i className="fab fa-twitter"></i></a></li>
                                    <li><a href="#!" className="rounded-3"><i className="fab fa-youtube"></i></a></li>
                                    <li><a href="#!" className="rounded-3"><i className="fab fa-linkedin-in"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="ps-lg-1-6 ps-xl-5">
                            <div className="mb-5 wow fadeIn">
                                <div className="text-start mb-1-6 wow fadeIn">
                                    <h2 className="h1 mb-0 text-primary-dark">#About Me</h2>
                                </div>
                                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.</p>
                                <p className="mb-0">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.</p>
                            </div>
                            <div className="mb-5 wow fadeIn">
                                <div className="text-start mb-1-6 wow fadeIn">
                                    <h2 className="mb-0 text-primary-dark">#Education</h2>
                                </div>
                                <div className="row mt-n4">
                                    <div className="col-sm-6 col-xl-4 mt-4">
                                        <div className="card text-center border-0 rounded-3">
                                            <div className="card-body">
                                                <i className="ti-bookmark-alt icon-box medium rounded-3 mb-4"></i>
                                                <h3 className="h5 mb-3">Education</h3>
                                                <p className="mb-0">University of defgtion, fecat complete ME of synage</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-xl-4 mt-4">
                                        <div className="card text-center border-0 rounded-3">
                                            <div className="card-body">
                                                <i className="ti-pencil-alt icon-box medium rounded-3 mb-4"></i>
                                                <h3 className="h5 mb-3">Career Start</h3>
                                                <p className="mb-0">After complete engineer join HU Signage Ltd as a project manager</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-xl-4 mt-4">
                                        <div className="card text-center border-0 rounded-3">
                                            <div className="card-body">
                                                <i className="ti-medall-alt icon-box medium rounded-3 mb-4"></i>
                                                <h3 className="h5 mb-3">Experience</h3>
                                                <p className="mb-0">About 20 years of experience and professional in signage</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="wow fadeIn">
                                <div className="text-start mb-1-6 wow fadeIn">
                                    <h2 className="mb-0 text-primary">#Skills &amp; Experience</h2>
                                </div>
                                <p className="mb-4">Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose.</p>
                                <div className="progress-style1">
                                    <div className="progress-text">
                                        <div className="row">
                                            <div className="col-6 fw-bold">Wind Turbines</div>
                                            <div className="col-6 text-end">70%</div>
                                        </div>
                                    </div>
                                    <div className="custom-progress progress rounded-3 mb-4">
                                        <div className="animated custom-bar progress-bar slideInLeft" /**style="width:70%" aria-valuemax="100" aria-valuemin="0" aria-valuenow="10" */role="progressbar"></div>
                                    </div>
                                    <div className="progress-text">
                                        <div className="row">
                                            <div className="col-6 fw-bold">Solar Panels</div>
                                            <div className="col-6 text-end">90%</div>
                                        </div>
                                    </div>
                                    <div className="custom-progress progress rounded-3 mb-4">
                                        <div className="animated custom-bar progress-bar bg-secondary slideInLeft" /**style="width:90%" aria-valuemax="100" aria-valuemin="0" aria-valuenow="70" */role="progressbar"></div>
                                    </div>
                                    <div className="progress-text">
                                        <div className="row">
                                            <div className="col-6 fw-bold">Hybrid Energy</div>
                                            <div className="col-6 text-end">80%</div>
                                        </div>
                                    </div>
                                    <div className="custom-progress progress rounded-3">
                                        <div className="animated custom-bar progress-bar bg-dark slideInLeft" /**style="width:80%" aria-valuemax="100" aria-valuemin="0" aria-valuenow="70" */role="progressbar"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            


            <Footer/>
        </div>
    )
}