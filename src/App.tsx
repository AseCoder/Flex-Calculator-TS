import './mcdu/mcdu.css';
import './App.css';
import './mcdu/mcduv2.css';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/system';

import Form from './form/form';
import Mcduv2 from './mcdu/mcduv2';
import RunwayVisualizationWidget, { DistanceLabel } from './runway/runway';
import { RootState } from './store/store';
import CrosswindCalc from './wind/crosswind';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {
    const runwaySetting = useSelector((state: RootState) => state.runway);
    const [len, setLen] = useState(0);
    const [wind, setWind] = useState(0);
    const [heading, setHeading] = useState('0');
    const [windSpeed, setwindSpeed] = useState(0);
    const [runwayVisualizationLabels, setRunwayVisualizationLabels] = useState<
        DistanceLabel[]
    >([]);

    useEffect(() => {
        const l = runwaySetting.length ? runwaySetting.length : 0;
        setLen(l);
        const d = runwaySetting.asd ? runwaySetting.asd : 0;
        setWind(runwaySetting.wind ? runwaySetting.wind : 0);
        const headingHasLetter = RegExp(/[A-Z]/g).test(
            runwaySetting.true ? runwaySetting.true : ''
        );
        const h = headingHasLetter
            ? runwaySetting.true?.slice(0, -1)
            : runwaySetting.true;
        setHeading(h ? h : '0');
        setwindSpeed(
            parseInt(
                runwaySetting.windSpeed
                    ? runwaySetting.windSpeed.toString()
                    : '0'
            )
        );

        setRunwayVisualizationLabels([
            {
                distance: d,
                label: 'ASD',
                type: 1,
            },
            {
                distance: l - d,
                label: 'Stop Margin',
                type: 2,
            },
        ]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [runwaySetting]);
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <div className="App">
                <Box
                    display="flex"
                    sx={{
                        height: '95vh',
                        pt: 2,
                    }}
                    justifyContent="space-between"
                >
                    <Form />
                    {/* <MCDU /> */}
                    {<Mcduv2 />}

                    <CrosswindCalc
                        rwHeading={parseInt(heading ? heading : '0') * 10}
                        windir={wind}
                        windspeed={windSpeed}
                    />

                    <RunwayVisualizationWidget
                        mainLength={len}
                        labels={runwayVisualizationLabels}
                        runwayHeading={parseInt(heading ? heading : '0') * 10}
                        distanceUnit={'m'}
                    />
                </Box>
            </div>
        </ThemeProvider>
    );
}

export default App;
