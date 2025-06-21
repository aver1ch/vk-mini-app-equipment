import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';

import { View, SplitLayout, SplitCol, ScreenSpinner, FixedLayout, Separator, TabsItem, Epic, usePlatform,
  useAdaptivityConditionalRender
} from '@vkontakte/vkui';
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';

import { Persik, Equipments, UserEquipments, UserEquipments2, AdminEquipments, AdminUsers, Home, AdminApplications} from './panels';
import { DEFAULT_VIEW_PANELS } from './routes';
import PropTypes from "prop-types";
import MainButtons from "./components/MainButtons.js"
import {Box} from "@mui/joy";


/*

Linter: 

npm install eslint --save-dev
npx eslint --init      # создаст конфиг (спросит про стиль, среду и т.д.)
npx eslint .            # проверит весь проект
npx eslint . --fix      # попытается исправить ошибки

*/

export const App = () => {
  // return (
  //     <label>test24</label>
  // );
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } = useActiveVkuiLocation();
  const [fetchedUser, setUser] = useState();
  const [popout, setPopout] = useState(<ScreenSpinner />);
  // const [activeTab, setActiveTab] = useState('groups');
  const platform = usePlatform();
  const { viewWidth } = useAdaptivityConditionalRender();
  const [activeStory, setActiveStory] = useState('profile');
  const activeStoryStyles = {
    backgroundColor: 'var(--vkui--color_background_secondary)',
    borderRadius: 8
  };
  const onStoryChange = (e) => setActiveStory(e.currentTarget.dataset.story);
  const hasHeader = platform !== 'vkcom';

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo');
      setUser(user);
      setPopout(null);
    }
    fetchData();
    setUser({
      photo_200: 'test',
      first_name: 'Test',
      last_name: 'Testovich',
      city: PropTypes.shape({
        title: 'Kodinsk',
      })});
      setPopout(null);
  }, []);


  return (
    <SplitLayout>
      <SplitCol>
      <FixedLayout filled vertical="bottom">
          <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
          >
              <MainButtons></MainButtons>
          </Box>
      </FixedLayout>
        <View activePanel={activePanel}>
          <Home id={DEFAULT_VIEW_PANELS.HOME} fetchedUser={fetchedUser} />
          <UserEquipments id={DEFAULT_VIEW_PANELS.USER_EQUIPMENTS} fetchedUser={fetchedUser} />
          <UserEquipments2 id={DEFAULT_VIEW_PANELS.USER_EQUIPMENTS2} fetchedUser={fetchedUser} />
          <AdminEquipments id={DEFAULT_VIEW_PANELS.ADMIN_EQUIPMENTS} fetchedUser={fetchedUser} />
          <AdminUsers id={DEFAULT_VIEW_PANELS.ADMIN_USERS} fetchedUser={fetchedUser} />
          <AdminApplications id={DEFAULT_VIEW_PANELS.ADMIN_APPLICATIONS} fetchedUser={fetchedUser} />
          <Persik id="persik" />
        </View>
      </SplitCol>
      {popout}
    </SplitLayout>
  );
};
