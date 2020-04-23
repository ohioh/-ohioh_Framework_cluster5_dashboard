import React, { useEffect, useState } from 'react';
import { Form, Select } from 'antd';
import { useParams } from 'react-router';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { getCompanySetupInfo } from 'store/company';
const { Option } = Select;

const CriteriaForm = () => {
  const [factory, setFactory] = useState('');
  const param = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCompanySetupInfo(param.uuid));
  }, [dispatch, param.uuid]);

  const { companySetupInfo } = useSelector((state) => state.company);
  console.log(companySetupInfo);
  console.log(factory);
  const departmenAndPositions = _.find(companySetupInfo, (data) => {
    return data.uuid === factory;
  });

  console.log(departmenAndPositions);
  return (
    <>
      <Form.Item label='Connect Type' name='connect_type'>
        <Select>
          <Option value='APP'>App</Option>
          <Option value='SMS'>SMS</Option>
        </Select>
      </Form.Item>
      <Form.Item label='Factory' name='factory_uuid'>
        <Select
          placeholder='Select a factory'
          onChange={(value) => setFactory(value)}
        >
          {_.map(companySetupInfo, (factory, i) => {
            return (
              <Option key={i} value={factory.uuid}>
                {factory.name}
              </Option>
            );
          })}
          <Option value='app'>App</Option>
          <Option value='sms'>SMS</Option>
        </Select>
      </Form.Item>
      {factory && (
        <Form.Item
          label='Department'
          placeholder='Select a department'
          name='department_uuid'
        >
          <Select>
            {_.map(departmenAndPositions.departments, (department, i) => {
              return (
                <Option key={i} value={department.uuid}>
                  {department.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
      )}
      {factory && (
        <Form.Item
          label='Position'
          placeholder='Select a position'
          name='position_uuid'
        >
          <Select>
            {_.map(departmenAndPositions.positions, (position, i) => {
              return (
                <Option key={i} value={position.uuid}>
                  {position.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
      )}
    </>
  );
};

export default CriteriaForm;
