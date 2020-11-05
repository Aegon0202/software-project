import React,{FC,memo,useState,useMemo,useEffect} from 'react';
import {IconButton,Grid,SvgIcon, Icon} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';


import DigitBoard from '../../containers/DigitBoard';

import useStyles from '../../styles/playBoard';
import classNames from 'classnames';

import {sudokuValue,PlayHistory} from '../../types';
import {Props} from '../../containers/PlayBoard';
import {numberIcons} from './consts';


function comparePlayBoardBlock(prevProps:any,nextProps:any){
    return  (
                prevProps.num === nextProps.num &&
                prevProps.className === nextProps.className
            );
}



const NumberIcon:FC<{
                        num:sudokuValue,
                        className:any,
                    }> =memo(({num,className})=>
{
    const classes=useStyles();
    const numIconMap={
        1:numberIcons.OneIcon,
        2:numberIcons.TwoIcon,
        3:numberIcons.ThreeIcon,
        4:numberIcons.FourIcon,
        5:numberIcons.FiveIcon,
        6:numberIcons.SixIcon,
        7:numberIcons.SevenIcon,
        8:numberIcons.EightIcon,
        9:numberIcons.NineIcon,
    };
    
    if(num==undefined)
        return (
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className={className}>
                <image width="100%" height="100%" xlinkHref="data:image/png;base64,"/>
            </svg>
        )
    else return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className={className}>
            {numIconMap[num]}
        </svg>
        )

},comparePlayBoardBlock);


const PlayBoard:FC<Props>=memo(({
    values,
    digitBoard,
    blockHighlight,
    playRound,
    toggleDigitBoardAction,
    clearBlockHighlightAction,
    updateSudokuAction,
    chooseDigitStartAction,
    blockHighlightAction,
})=>{

    const classes=useStyles();

    useEffect(()=>{
        updateSudokuAction();
    },[])

    return (
        <>
            <div className={classes.playBoardContainer} onMouseLeave={clearBlockHighlightAction}>
                <Grid container spacing={0}>
                    {values.map((nums:sudokuValue[],line)=>(
                        <Grid key={`PlayBoard${line}`} container item spacing={0}>
                            {nums.map((num,column)=>(
                                <div onClick={toggleDigitBoardAction} className={classes.PlayBoardLine}>
                                    <Grid item key={`PlayBoardLine${line}Block${column}`}>
                                        <IconButton className={classes.playBoardBlockContainer} onMouseEnter={()=>{
                                            chooseDigitStartAction(line,column,num);
                                            blockHighlightAction(num);
                                        }}>
                                            <NumberIcon
                                                num={values[line][column]}
                                                className={classNames(
                                                    classes.normal,
                                                    {
                                                        [classes.hightLight]:blockHighlight[line][column],
                                                    }
                                                )}
                                                >
                                            </NumberIcon>
                                        </IconButton>
                                    </Grid>
                                </div>
                            ))}
                        </Grid>
                    ))}
                </Grid>
            </div>
            {useMemo(()=>(
                <div onClick={toggleDigitBoardAction}>
                    <DigitBoard open={digitBoard} onClose={toggleDigitBoardAction}/>
                </div>
            ),[digitBoard])}
        </>
    );
})

export default PlayBoard;