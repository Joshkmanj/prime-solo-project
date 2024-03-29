// Importing tools
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
// import * as React from 'react';
import PropTypes from 'prop-types';
import MultiSelectUnstyled from '@mui/base/MultiSelectUnstyled';
import { selectUnstyledClasses } from '@mui/base/SelectUnstyled';
import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import { styled } from '@mui/system';

import NavBar from '../NavBar/NavBar'

// Importing views
import VaycayModifier from './VaycayModifier.jsx';
import TradeModifier from './TradeModifier.jsx';

function ModifyShift() {

    const dispatch = useDispatch();
    let { modifier, shiftId } = useParams()
    const user = useSelector((store) => store.user)
    const schedule = useSelector((store) => store.schedule)
    const openShifts = useSelector((store) => store.openShifts)
    // const todaysDate = useSelector((store) => store.todaysDate)

    
    useEffect(() => {
        console.log('In useEffect');
        // dispatch({ type: 'FETCH_CURRENT_DATE' })
        // dispatch({ type: 'FETCH_SHIFTS', payload: user.id })
        // dispatch({ type: 'FETCH_OPEN_SHIFTS', payload: user.id})
    }, [])




    //----------- MULTISELECT-----------------------------
    // const blue = {
    //     100: '#DAECFF',
    //     200: '#99CCF3',
    //     400: '#3399FF',
    //     500: '#007FFF',
    //     600: '#0072E5',
    //     900: '#003A75',
    //   };

    //   const grey = {
    //     100: '#E7EBF0',
    //     200: '#E0E3E7',
    //     300: '#CDD2D7',
    //     400: '#B2BAC2',
    //     500: '#A0AAB4',
    //     600: '#6F7E8C',
    //     700: '#3E5060',
    //     800: '#2D3843',
    //     900: '#1A2027',
    //   };

    //   const StyledButton = styled('button')(
    //     ({ theme }) => `
    //     font-family: IBM Plex Sans, sans-serif;
    //     font-size: 0.875rem;
    //     box-sizing: border-box;
    //     min-height: calc(1.5em + 22px);
    //     min-width: 320px;
    //     background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    //     border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
    //     border-radius: 0.75em;
    //     margin: 0.5em;
    //     padding: 10px;
    //     text-align: left;
    //     line-height: 1.5;
    //     color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};

    //     &:hover {
    //       background: ${theme.palette.mode === 'dark' ? '' : grey[100]};
    //       border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
    //     }

    //     &.${selectUnstyledClasses.focusVisible} {
    //       outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[100]};
    //     }

    //     &.${selectUnstyledClasses.expanded} {
    //       &::after {
    //         content: '▴';
    //       }
    //     }

    //     &::after {
    //       content: '▾';
    //       float: right;
    //     }
    //     `,
    //   );

    //   const StyledListbox = styled('ul')(
    //     ({ theme }) => `
    //     font-family: IBM Plex Sans, sans-serif;
    //     font-size: 0.875rem;
    //     box-sizing: border-box;
    //     padding: 5px;
    //     margin: 10px 0;
    //     min-width: 320px;
    //     background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    //     border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
    //     border-radius: 0.75em;
    //     color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    //     overflow: auto;
    //     outline: 0px;
    //     `,
    //   );

    //   const StyledOption = styled(OptionUnstyled)(
    //     ({ theme }) => `
    //     list-style: none;
    //     padding: 8px;
    //     border-radius: 0.45em;
    //     cursor: default;

    //     &:last-of-type {
    //       border-bottom: none;
    //     }

    //     &.${optionUnstyledClasses.selected} {
    //       background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    //       color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
    //     }

    //     &.${optionUnstyledClasses.highlighted} {
    //       background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    //       color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    //     }

    //     &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
    //       background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    //       color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
    //     }

    //     &.${optionUnstyledClasses.disabled} {
    //       color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
    //     }

    //     &:hover:not(.${optionUnstyledClasses.disabled}) {
    //       background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    //       color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    //     }
    //     `,
    //   );

    //   const StyledPopper = styled(PopperUnstyled)`
    //     z-index: 1;
    //   `;

    //   const CustomMultiSelect = React.forwardRef(function CustomMultiSelect(props, ref) {
    //     const components = {
    //       Root: StyledButton,
    //       Listbox: StyledListbox,
    //       Popper: StyledPopper,
    //       ...props.components,
    //     };

    //     return <MultiSelectUnstyled {...props} ref={ref} components={components} />;
    //   });

    //   CustomMultiSelect.propTypes = {
    //     /**
    //      * The components used for each slot inside the Select.
    //      * Either a string to use a HTML element or a component.
    //      * @default {}
    //      */
    //     components: PropTypes.shape({
    //       Listbox: PropTypes.elementType,
    //       Popper: PropTypes.func,
    //       Root: PropTypes.elementType,
    //     }),
    //   };
    //----------- MULTISELECT-----------------------------

    const testHandler = () => {
        // console.log('Test button clicked');
        // dispatch({ type: 'FETCH_CURRENT_DATE' })
    }

    const [firstArray, setFirstArray] = useState(
        ['true', 'true', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'true', 'true', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'true', 'true', 'true']
        );
        const [secondArray, setSecondArray] = useState('')

    const mathHandler = (array) => {
        let scndArray = []
        for (let i = 1; i < array.length +1; i++) {
            console.log(i);
            if (array[i] == 'true'){
                console.log(['date','shift time', i]);
                scndArray.push(['date','shift time', i])
            } else{
                console.log('false');
            }
        }
        setSecondArray(scndArray);
    }
    const refreshHandler = () => {
        console.log('refresh button clicked');
        console.log(firstArray);
        console.log(secondArray);
    }



    return (
        <>
            <NavBar />
            <h1>Mod:{modifier}, shiftId:{shiftId}</h1>
            {/* {(modifier === 'vaycay') && <VaycayModifier schedule={schedule} />} */}
            <button onClick={testHandler}>Test button</button>
            <button onClick={() =>{mathHandler(firstArray)}}>Math button</button>
            <button onClick={refreshHandler}>refresh button</button>

                <pre>
                {JSON.stringify(firstArray)}
                {secondArray && <h3>heres the second array</h3> + JSON.stringify(secondArray)}
                </pre>

        </>
    )
}
export default ModifyShift;