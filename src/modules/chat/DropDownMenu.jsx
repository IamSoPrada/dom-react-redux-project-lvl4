/* eslint-disable */
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import Label from '../common/components/Label.jsx';
import cn from 'classnames';
import { actions as dropDownMenuActions } from '../../slices/dropDownSlice.js';
import { handleOpenModal, modalRemoveChannelInfo, modalRenameChannelInfo } from '../modals/utils.js';

const DropDownMenu = ({ id }) => {
  const dispatch = useDispatch();
  const isDropDownMenuOpened = useSelector(({ dropDown }) => dropDown.isOpened);
  const currentDropDownOpened = useSelector(({ dropDown }) => dropDown.channelId);
  const isModalOpened = useSelector(({ modal }) => modal.isOpened);
  const { t } = useTranslation();
  const dropdownMenuClasses = cn({
    'dropdown-menu': true,
    show: currentDropDownOpened === id ? isDropDownMenuOpened : false,
  });

  const removeChannelInfo = modalRemoveChannelInfo(id);
  const renameChannelInfo = modalRenameChannelInfo(id);

  const setCurrentDropDownMenuOpened = (channelId) => {
    dispatch(dropDownMenuActions.openDropDown(channelId));
  };

  useEffect(() => isModalOpened && dispatch(dropDownMenuActions.closeDropDown()), [isModalOpened]);

  return (
    <div className="btn-group">
      <button onClick={() => setCurrentDropDownMenuOpened(id)} type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded={isDropDownMenuOpened}><Label>Управление каналом</Label></button>
      <div
        className={dropdownMenuClasses}
      >
        <a role="button" onClick={() => handleOpenModal(removeChannelInfo)} className="dropdown-item">
          {t('channels.buttons.delete')}
        </a>
        <a role="button" onClick={() => handleOpenModal(renameChannelInfo)} className="dropdown-item">
          {t('channels.buttons.rename')}
        </a>
      </div>

    </div>
  );
};

export default DropDownMenu;
