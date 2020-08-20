import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import AppContext from "../context";
import PlanView from "./PlanView/PlanView";
import TimerView from "./TimerView/TimerView";
import TimerPlayer from "../Components/Timer/TimerPlayer";
import Header from "../Components/Header/Header";
import Modal from "../Components/Modal/Modal";
import Footer from "../Components/Footer/Footer";
import LogView from "../Views/LogView/LogView";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import styles from "./Root.module.scss";
import { AuthContext } from "../Auth";
import { db } from "../base";

class Root extends React.Component {
  state = {
    task: [],
    newItem: "",
    count: 300,
    activeItem: 0,
    isModalOpen: false,
    startTimer: 0,
    uid: "",
  };

  openModal = () => {
    this.setState({
      isModalOpen: true,
    });
  };

  closeModal = (e) => {
    this.setState({
      isModalOpen: false,
    });
  };

  clearTaskList = () => {
    this.setState({ task: [] });
  };

  addItem = (e, newItem) => {
    e.preventDefault();
    newItem = {
      title: newItem.title,
      id: 1 + Math.random(),
      active: newItem.active,
    };
    this.setState((prevState) => ({
      task: [...prevState["task"], newItem],
    }));
  };

  deleteItems = (id) => {
    const list = [...this.state.task];
    const updatedList = list.filter((item) => item.id !== id);

    this.setState({ task: updatedList });
  };

  addMinute = () => {
    this.setState((prevState) => ({ count: (prevState.count += 60) }));
    console.log(this.state.count);
  };

  resetTimer = () => {
    this.setState({ count: 300 });
  };

  startTimerFn = () => {
    if (this.state.task.length === 0) {
      alert("Add some tasks firtst.");
    } else {
      this.setState({
        startTimer: 1,
      });
    }
  };
  pauseTimer = () => {
    this.setState({
      startTimer: 0,
    });
  };
  stopTimer = () => {
    if (window.confirm("Do you want to reset timer")) {
      this.pauseTimer();
      this.resetTimer();
      this.setState({
        activeItem: 0,
      });
    }
  };

  populateList = (user) => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("task")
        .orderBy("date", "asc")
        .get()
        .then((snapshot) => {
          let dbList = snapshot.docs.map((doc) => doc.data());
          this.setState({
            task: dbList,
          });
        });
    }
  };

  render() {
    const { isModalOpen, count } = this.state;
    const contextElements = {
      ...this.state,
      addItem: this.addItem,
      resetTimer: this.resetTimer,
      addMinute: this.addMinute,
      deleteItems: this.deleteItems,
      startTimerFn: this.startTimerFn,
      startTimer: this.state.startTimer,
      pauseTimer: this.pauseTimer,
      stopTimer: this.stopTimer,
      populateList: this.populateList,
    };

    return (
      <HashRouter basename="/">
        <AppContext.Provider value={contextElements} time={count} activeItem={this.activeItem}>
          <Header openModalFn={this.openModal} clearTaskList={this.clearTaskList} />
          <TimerPlayer
            startTimer={this.state.startTimer}
            activeItem={this.state.activeItem}
            task={this.state.task}
          />
          {isModalOpen && <Modal closeModalFn={this.closeModal} />}
          {/* {console.log(this.context.currentUser)} */}
          <Route
            render={({ location }) => (
              <TransitionGroup>
                <CSSTransition key={location.key} timeout={500} classNames="item">
                  <Switch location={location}>
                    <Route exact path="/" component={TimerView} />
                    <Route exact path="/plan" component={PlanView} />
                    <Route exact path="/log" component={LogView} />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            )}
          />
        </AppContext.Provider>
        <Footer className={styles.wrapper} />
      </HashRouter>
    );
  }

  componentDidMount() {
    this.myInterval = setInterval(() => {
      if (this.state.activeItem >= this.state.task.length) {
        this.pauseTimer();
        this.resetTimer();
        this.setState({
          activeItem: 0,
        });
      }
      this.setState((prevState) => ({
        count: prevState.count - this.state.startTimer,
      }));
      if (this.state.count <= 0) {
        this.resetTimer();
        this.setState((prevState) => ({
          activeItem: prevState.activeItem + 1,
        }));
      }
    }, 1000);
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousState.uid !== this.context.currentUser) {
      this.setState({ uid: this.context.currentUser });
      this.context.currentUser !== null
        ? this.populateList(this.context.currentUser)
        : console.log("nie ma bumbap");
    }
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }
}

Root.contextType = AuthContext;

export default Root;
