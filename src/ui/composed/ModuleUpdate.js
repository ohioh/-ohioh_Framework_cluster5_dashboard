import React, { useEffect } from 'react';
import _ from 'lodash';
import { useHistory } from 'react-router-dom';
import { Form, Checkbox } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { updateCompanyModules, getCompanies } from 'store/company';
import { Button } from 'ui';

function ModuleUpdate({ moduleUpdate }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getCompanies());
  }, [dispatch]);
  console.log(moduleUpdate);

  const { companies } = useSelector((state) => state.company);
  const lastCompany = companies.results[0];

  const options = [
    { label: 'Connect : Connect with workers.', value: 'connect' },
    { label: 'Engage : Get insight from worker engagement.', value: 'engage' },
    { label: 'HR : Manage HR modules online.', value: 'hr' },
    { label: 'Training : Provide training to workers.', value: 'training' },
  ];
  const defaultModuleValues = _.map(moduleUpdate.prevModules, (value) => {
    return _.lowerCase(value.name);
  });
  console.log(defaultModuleValues);

  const onFinish = async ({ updatedModules }) => {
    // console.log(updatedModules);
    const modules = {
      connect: false,
      engage: false,
      hr: false,
      training: false,
    };
    if (updatedModules) {
      for (let key in modules) {
        for (let i = 0; i < updatedModules.length; i++) {
          if (key === updatedModules[i]) {
            modules[key] = true;
          }
        }
      }
      console.log(modules);
      await dispatch(
        updateCompanyModules(
          moduleUpdate.companyUUID
            ? moduleUpdate.companyUUID
            : lastCompany.uuid,
          modules
        )
      );
      moduleUpdate.redirectLink && history.push(moduleUpdate.redirectLink);
    }
  };
  return (
    <>
      {/* <Form form={form} name='create-survey' onFinish={onFinish}>
        <Form.Item name='connect' checked valuePropName='checked'>
          <Checkbox>
            <b>Connect :</b> Connect with workers
          </Checkbox>
        </Form.Item>
        <Form.Item name='engage' valuePropName='checked'>
          <Checkbox>
            <b>Engage :</b> Get insight from worker engagement
          </Checkbox>
        </Form.Item>
        <Form.Item name='hr' valuePropName='checked'>
          <Checkbox>
            <b>HR :</b> Manage HR modules online
          </Checkbox>
        </Form.Item>
        <Form.Item name='training' valuePropName='checked'>
          <Checkbox>
            <b>Training :</b> Provide training to workers
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form> */}
      <Form form={form} onFinish={onFinish}>
        <Form.Item name='updatedModules' valuePropName='checked'>
          <Checkbox.Group
            options={options}
            defaultValue={defaultModuleValues ? defaultModuleValues : null}
            // onChange={onChange}
          />
        </Form.Item>
        <Button type='primary' htmlType='submit'>
          Update
        </Button>
      </Form>
    </>
  );
}

export default ModuleUpdate;
