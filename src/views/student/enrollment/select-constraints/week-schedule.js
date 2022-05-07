/* eslint-disable no-lonely-if */
/* eslint-disable arrow-body-style */
import { Box, Grid, Paper, Typography } from '@mui/material';
import React from 'react';

/** Number of days to be shown */
const NumWeekDays = 5;

const WeekDays = [
    { key: 'Segunda', label: 'Segunda-feira' },
    { key: 'Terça', label: 'Terça-feira' },
    { key: 'Quarta', label: 'Quarta-feira' },
    { key: 'Quinta', label: 'Quinta-feira' },
    { key: 'Sexta', label: 'Sexta-feira' }
];

export const TimeSlotIncrements = 60; // 1 Hour
export const TimeSlots = new Array((24 * 60) / TimeSlotIncrements).fill(1).map((val, idx) => idx + 1);

export const timeSlotIdxToTime = (timeSlotIdx) => {
    const minutesAmount = timeSlotIdx * TimeSlotIncrements;
    const hours = Math.floor(minutesAmount / 60);
    const minutes = minutesAmount % 60;
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    //   return `${hours.toString(2)}:${minutes.toFixed(2)}`;
    return `${date.toLocaleString('pt-BR', {
        hour12: false,
        hour: 'numeric',
        minute: 'numeric'
    })}`;
};

const TimeSlotBox = ({ day, timeSlotIdx, selected, onClick, onMouseEnter, onMouseLeave, type, label }) => {
    const color = () => {
        if (selected) {
            if (type) {
                switch (type) {
                    case 'Obrigatória':
                        return '#900';
                    case 'Opcional':
                        return '#870';
                    case 'class':
                        return '#777';
                    default:
                        return '#000';
                }
            } else {
                return '#333';
            }
        } else {
            return undefined;
        }
    };

    return (
        <Box
            sx={{
                bgcolor: color(),
                width: '100%',
                flex: 1,
                borderTop: '1px solid black'
            }}
            onClick={() => onClick(day, timeSlotIdx)}
            onMouseEnter={() => onMouseEnter(day, timeSlotIdx)}
            onMouseLeave={() => onMouseLeave(day, timeSlotIdx)}
        >
            <Typography variant="caption">
                {timeSlotIdxToTime(timeSlotIdx)}
                {label ? ` - ${label}` : null}
            </Typography>
        </Box>
    );
};

const WeekSchedule = ({ selectedSlots, onSelectNewSlot }) => {
    const [slotBeingHovered, setSlotBeingHovered] = React.useState(null);
    const [anchoredSlot, setAnchoredSlot] = React.useState(null);

    const onClickSlot = (day, idx) => {
        if (!anchoredSlot) {
            console.log(day, idx);
            setAnchoredSlot({ day, index: idx });
        } else {
            // Mark new selection
            setAnchoredSlot(null);

            const selection = {
                day,
                start: anchoredSlot.index,
                end: idx
            };

            onSelectNewSlot(selection);
        }
    };

    const onMouseEnterSlot = (day, idx) => {
        setSlotBeingHovered({ day, index: idx });
    };

    const onMouseLeaveSlot = (day, idx) => {
        setSlotBeingHovered(null);
    };

    const shouldMarkSlot = (day, idx) => {
        // First, already selected
        let markSelect = false;
        selectedSlots.forEach((selection) => {
            if (selection.day === day && idx >= selection.start && idx <= selection.end) {
                markSelect = true;
            }
        });

        if (markSelect) return true;

        if (slotBeingHovered) {
            if (slotBeingHovered.day === day && idx === slotBeingHovered.index) {
                return true;
            }

            // When a slot has been selected previously
            if (anchoredSlot) {
                // Hide other days
                if (day === anchoredSlot.day) {
                    if (slotBeingHovered.index > anchoredSlot.index) {
                        if (idx >= anchoredSlot.index && idx <= slotBeingHovered.index) {
                            return true;
                        }
                    } else {
                        if (idx <= anchoredSlot.index && idx >= slotBeingHovered.index) {
                            return true;
                        }
                    }
                }
            }
        }

        return false;
    };

    const getType = (day, idx) => {
        let markSelect;
        selectedSlots.forEach((selection) => {
            if (selection.day === day && idx >= selection.start && idx <= selection.end) {
                markSelect = selection;
            }
        });

        if (markSelect) return markSelect.type;

        return undefined;
    };

    const getLabel = (day, idx) => {
        let markSelect;
        selectedSlots.forEach((selection) => {
            if (selection.day === day && idx === selection.start) {
                markSelect = selection;
            }
        });

        if (markSelect) {
            return markSelect.label;
        }

        return undefined;
    };

    return (
        <Paper sx={{ bgcolor: 'palette.primary.light' }}>
            <Grid container>
                {WeekDays.map((weekDay) => (
                    <Grid item xs spacing={1}>
                        <Box
                            sx={{
                                border: '1px solid black',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            {/* Week Day Header */}
                            <Box
                                sx={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    display: 'flex'
                                }}
                            >
                                <Typography variant="h6" sx={{ marginTop: 2 }}>
                                    {weekDay.label}
                                </Typography>
                            </Box>

                            {/* Time Slots */}
                            <Box
                                sx={{
                                    flexDirection: 'column',
                                    display: 'flex',
                                    height: '100%',
                                    flex: 1
                                }}
                            >
                                {TimeSlots.map((timeSlot, timeSlotIdx) => {
                                    return (
                                        <TimeSlotBox
                                            timeSlotIdx={timeSlotIdx}
                                            selected={shouldMarkSlot(weekDay.key, timeSlotIdx)}
                                            day={weekDay.key}
                                            onClick={onClickSlot}
                                            onMouseEnter={onMouseEnterSlot}
                                            onMouseLeave={onMouseLeaveSlot}
                                            type={getType(weekDay.key, timeSlotIdx)}
                                            label={getLabel(weekDay.key, timeSlotIdx)}
                                        />
                                    );
                                })}
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
};

export default WeekSchedule;
