import { BrowserRouter, Route } from "react-router-dom";
import { MainPage } from "../pages/Main";

export const Router = () => {
  return (
    <BrowserRouter>
      <MainPage />
      {/* <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/blog" component={BlogPage} />
        <Route path="/leaderbord" component={LeaderbordPage} />
        <Route component={NoMatch} />
      </Switch> */}
    </BrowserRouter>
  );
};
