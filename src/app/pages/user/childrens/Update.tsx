import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUserInfo } from '../user.actions';
import { useTranslation } from 'react-i18next';
import { getData } from '../../../core/helpers/localstorage';
import UserUpdatePassword from '../partials/UserUpdatePassword';
import UserUpdateProfile from '../partials/UserUpdateProfile';
import TabNav from '../../../shared/components/partials/TabNav';
import TabContent from '../../../shared/components/partials/TabContent';

const Update = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState<string>('update-profile');

  useEffect(() => {
    if (getData('token', '')) {
      dispatch(getUserInfo({ id: 'me' }));
    }
  }, []);

  return (
    <section className="section-update">
      <div className="container">
        <div className="row">
          <div className="col-3">
            <ul className="tab-user-list">
              <TabNav
                content={
                  <div className="tab-user">
                    <span className="tab-user-title">{t('common.header.update_profile')}</span>
                  </div>
                }
                id="update-profile"
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              <TabNav
                content={
                  <div className="tab-user">
                    <span className="tab-user-title">{t('common.header.change_password')}</span>
                  </div>
                }
                id="change-password"
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </ul>
          </div>
          <div className="col-9">
            <TabContent id="update-profile" activeTab={activeTab}>
              <UserUpdateProfile />
            </TabContent>
            <TabContent id="change-password" activeTab={activeTab}>
              <UserUpdatePassword />
            </TabContent>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Update;
