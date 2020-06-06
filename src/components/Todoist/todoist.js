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
import { Dunzo } from '../../services/api';

function Todoist(props) {
  const defaultState = useSelector(defaultDashboardTodoistState);
  const dispatch = useDispatch();

  const initialDataFetch = async () => {
    const res = await Dunzo.getAllTasksStatusActive();

    if (res.status === 200) {
      dispatch(dashboardTodoistUpdate(res.data));
    }
  };

  useEffect(() => {
    initialDataFetch();
  }, []);

  return (
    <div>
      <MainArea></MainArea>
    </div>
  );
}

export default Todoist;
  