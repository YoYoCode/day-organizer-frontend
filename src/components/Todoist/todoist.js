import React, { Component, useEffect } from 'react';
import _ from 'lodash';
import MainArea from '../Mainarea/Mainarea';
import {
  defaultDashboardTodoistState,
  dashboardTodoistUpdate
} from './todoist-dashboard-slice';
import TestData from '../../Test-data/test-data.json';
import { useSelector, useDispatch } from 'react-redux';
import store from '../../app/store';


function Todoist(props) {
  const defaultState = useSelector(defaultDashboardTodoistState);
  const dispatch = useDispatch();

  var a = store.getState();
  console.log(a);

  useEffect(() => {
    Promise.resolve(setTimeout(() => {
    }, 5000)).then(() => {
      dispatch(dashboardTodoistUpdate(TestData));
    });
  });

  return (
    <div>
      <MainArea></MainArea>
    </div>
  );
}

export default Todoist;
  