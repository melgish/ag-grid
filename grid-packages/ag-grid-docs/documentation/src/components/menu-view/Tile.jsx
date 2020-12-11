import React, { Fragment, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames';
import styles from './Tile.module.scss';
import icons from './icons';

const getUrl = (url) => url.replace('../', '');

const recursiveRender = (items, framework, group, collapsed, level = 0, isLast, forceTopLevel) => items.map((item, idx) => {
    if (item.frameworks && item.frameworks.indexOf(framework) === - 1) { return null; }

    const className = `menu-view-tile__list__${level === 0 || forceTopLevel ? 'block' : 'inline'}`;
    const hideComma = level === 0 || forceTopLevel || (isLast && items.length - 1 === idx);

    const title = item.url && (!collapsed || item.showInCollapsed) && (
        <span className={ styles[className]}>
            <a href={ getUrl(item.url) }>{ item.title }{ item.enterprise && <enterprise-icon/> }</a>
            { !hideComma && <span className={ styles['menu-view-tile__item-split'] } style={{ marginRight: 2 }}>,</span> }
        </span>
     )

     let content = null;
     const nextItems = item.items;
     
     if (nextItems && nextItems.length) {
        content = recursiveRender(
            nextItems,
            framework,
            item.title.replace(/\s/g,'_').toLowerCase(),
            collapsed, 
            level + 1,
            level === 0 || (isLast && idx === items.length - 1),
            !!item.forceTopLevelSubItems
        )
     }


    if (!title && !content) { return null; }

    return (
        <Fragment key={`${group}_${item.title.replace(/\s/g,'_').toLowerCase()}`}>
            { title }
            { content }
        </Fragment>
    )
});

const Tile = ({ data, group, framework }) => {
    const [collapsed, setCollapsed] = useState(true);

    if (!data.icon) { return null; }
    const iconName = data.icon.replace('icon-','');
    const iconAlt= iconName.replace(/-/g,' ');

    const onClick = () => {
        if (document.body.clientWidth < 768) {
            setCollapsed(!collapsed);
        }
    }

    const onMouseOut = () => {
        setCollapsed(true);
    }

    return (
        <div 
            className={ classnames(styles['menu-view-tile'], { [styles['menu-view-tile--collapsed']]: collapsed }) }
            onClick={ () => onClick() }
            onMouseLeave={ () => onMouseOut() }>
            <div className={ styles['menu-view-tile__icon'] }><img alt={ iconAlt } src={ icons[iconName] }></img></div>
            <h3 className={ styles['menu-view-tile__title'] }>{ data.title }</h3>
            <div className={ styles['menu-view-tile__list'] }>
                { recursiveRender(data.items, framework, group, collapsed) }
            </div>
            <FontAwesomeIcon icon={collapsed ? faChevronDown : faChevronUp } fixedWidth className={styles['menu-view-tile__expander']} />
        </div>
    )
}

export default Tile;