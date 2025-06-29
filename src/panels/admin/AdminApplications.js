import {Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, SplitCol, SplitLayout, PanelHeaderBack } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import PropTypes from 'prop-types';
import './../../assets/css/main.css';
import {getAllEquipments} from './../../api/Equipments.js';
import {createContext, useContext, useEffect, useState, useRef} from "react";
import EditEquipmentForm from "./../../components/EditEquipmentForm.js";
import EditApplicationForm from "./../../components/EditApplicationForm.js";
import Table1 from "./../../components/AdminApplicationTable1.js";
import Table2 from "./../../components/AdminApplicationTable2.js";
import TableApplication from "./../../components/UserApplicationTable.js";
import Calendar from 'react-calendar';
import * as React from 'react';


const headCells = [
  {
    id: 'action',
    numeric: false,
    disablePadding: false,
    label: '',
  },
  {
    id: 'id',
    numeric: true,
    disablePadding: false,
    label: '№',
  },
  {
    id: 'category',
    numeric: false,
    disablePadding: false,
    label: 'Категория',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Наименование',
  },
  {
    id: 'quantity',
    numeric: true,
    disablePadding: false,
    label: 'Количество',
  },
  {
    id: 'borrow_price',
    numeric: true,
    disablePadding: false,
    label: 'Залог (₽)',
  },
  {
    id: 'price',
    numeric: true,
    disablePadding: false,
    label: 'Прокат (₽/день)',
  },
  {
    id: 'ingredients',
    numeric: false,
    disablePadding: true,
    label: 'Состав',
  },
];

function createData(id, category, name, quantity, borrowPrice, price, ingredients) {
  var action = 'Edit';
  return {
    action, id, category, name, quantity, borrowPrice, price, ingredients,
  };
}

const rows = [
  createData(1, 'Горное', 'Шнур 16-пряный 6мм', 1, 100.00, 10.00, ''),
  createData(2, 'Горное', 'Карабин "Ринг"(сталь)', 3, 200.00, 20.00, ''),
  createData(3, 'Водное', 'Заглушка', 6, 300.00, 30.00, ''),
  
];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const AdminApplications = ({ id, fetchedUser }) => {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dataContext = useContext(createContext(null));
  const { photo_200, city, first_name, last_name } = { ...fetchedUser };
  const routeNavigator = useRouteNavigator();
  const equipments = dataContext?.data?.equipments;
  const [valueCalendar, onChangeCalendar] = useState([]);
  const calendarRef = useRef(null);


  const loadEquipments = async () => {
    try {
      const fetchedEquipments = await getAllEquipments();
      console.log(fetchedEquipments);

      if (!dataContext || !fetchedEquipments) {
        return;
      }

      dataContext.setData({
        ...dataContext.data,
        equipments: fetchedEquipments,
      });
    } catch (e) {
      setError(new Error(JSON.stringify(e)));
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (equipments) {
      setLoading(false);
      return;
    }
    loadEquipments();
  }, [equipments]);

 
  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}>
        Администрирование заявок
      </PanelHeader>
      <Group header={<Header size="s">Список заявок</Header>}>
        <Table1/>
      </Group>
      <Group header={<Header size="s">Содержимое заявки №3</Header>}>
        <Table2/>
      </Group>
    </Panel>
  );
};

AdminApplications.propTypes = {
  id: PropTypes.string.isRequired,
  fetchedUser: PropTypes.shape({
    photo_200: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    city: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
};
