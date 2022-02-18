import React from 'react';
import { useDispatch } from 'react-redux';
import { actions as channelsActions } from '../../slices/channelsInfoSlice.js';
import DropDownMenu from './DropDownMenu.jsx';

const ChannelsItem = ({ id, props }) => {
  const { removable, name } = props;
  const dispatch = useDispatch();

  const setCurrentChannel = () => {
    dispatch(channelsActions.setCurrentChannel(id));
  };

  return (
    <>
      <li href="#" className="d-flex justify-between list-group-item  py-3 lh-tight">
        <button type="button" onClick={setCurrentChannel} className="btn btn-light d-flex w-100 align-items-center justify-content-between">
          <strong
            className="mb-1 text-center"
            style={{
              overflow: 'hidden', display: 'inline-block', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '110px',
            }}
          >
            #
            {name}
          </strong>
        </button>
        {removable && <DropDownMenu id={id} />}
      </li>

    </>
  );
};

export default ChannelsItem;
