/* eslint-disable react/self-closing-comp */
/* eslint-disable arrow-body-style */
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import { Button, Card, Modal, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';
import CourseOffersData from '../../../../data/course-offers.json';
import WeekSchedule, { timeSlotIdxToTime, TimeSlots } from './week-schedule';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',

    boxShadow: 24,

    borderRadius: 8,
    p: 4
};

const content = [
    { type: 'header', text: 'Instruções' },
    {
        type: 'body',
        text: 'No calendário abaixo, você pode indicar quais são as suas restrições de horário. Clique em um slot de horário para marcar um horário de início, e em seguida clique em outro slot de horário para marcar o horário de fim. Indique o rótulo dessa restrição e marque o tipo de restrição.'
    },
    { type: 'header', text: 'Tipos de restrição' },
    {
        type: 'body',
        text: 'Existem dois tipos de restrição: um horário restrito indica que nenhuma turma vai ser escolhida para aquele horário, sob nenhuma hipótese. Uma restrição flexível indica que uma turma pode ser colocada naquele horário, mas deve ser confirmada primeiro.'
    }
];

const getClassesSlots = (selectedClasses) => {
    console.log(selectedClasses);
    const offers = selectedClasses
        .map(({ schedule, classId, courseCode, name }) => {
            const days = Object.keys(schedule);

            return days.map((day) => {
                let timeSlot;
                TimeSlots.forEach((slot) => {
                    const time = timeSlotIdxToTime(slot);
                    const hours = time.split(':')[0];
                    const minutes = time.split(':')[1];
                    console.log('Hours', hours);

                    if (schedule[day].startTime.split(':')[0] === time.split(':')[0]) timeSlot = slot;
                });

                console.log(timeSlot);

                return {
                    day,
                    start: timeSlot,
                    end: timeSlot + 2,
                    type: 'class',
                    label: `${courseCode} (${classId}) | ${name.slice(0, 10)}...`
                };
            });
        })
        .reduce((prev, curr) => [...prev, ...curr], []);

    console.log(offers);

    return offers;
};

const mergeClassesWithConstraints = (classes, constraints) => {
    return classes.concat(constraints);
};

const SelectConstraintsView = () => {
    const navigate = useNavigate();

    const { state } = useLocation();

    const currentSemester = '2021/2';
    const courseOffers = CourseOffersData[currentSemester];

    const classesSlots = getClassesSlots(state.selectedClasses);

    const [selectedSlots, setSelectedSlots] = React.useState([]);

    const [configModalOpen, setConfigModalOpen] = React.useState(false);
    const [selectionConfig, setSelectionConfig] = React.useState(null);
    const [slotNameInput, setSlotNameInput] = React.useState('');

    const slotNameInputChangeHandler = (e) => {
        const text = e.target.value;
        setSlotNameInput(text);
    };

    const onSelectNewSlot = (newSelection) => {
        console.log(newSelection);

        setSelectionConfig(newSelection);
        setConfigModalOpen(true);
    };

    const confirmSelectionHandler = (type) => {
        setConfigModalOpen(false);
        if (selectionConfig) {
            setSelectedSlots([...selectedSlots, { ...selectionConfig, type, label: slotNameInput }]);

            setSlotNameInput('');
        }
    };

    const reset = () => {
        setConfigModalOpen(false);
        setSelectionConfig(null);
    };

    const clickContinueHandler = () => {
        navigate('/enrollment/confirm', { state: { selectedSlots, selectedClasses: state.selectedClasses } });
    };

    return (
        <>
            <MainCard title="Selecionar restrições de horário">
                <Card sx={{ overflow: 'hidden' }}>
                    <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', margin: 3 }}>
                        {content.map((p) => {
                            switch (p.type) {
                                case 'body':
                                    return (
                                        <Typography variant="body2" sx={{ width: '75%', fontSize: 16, textAlign: 'justify' }}>
                                            {p.text}
                                        </Typography>
                                    );
                                case 'header':
                                    return (
                                        <Typography variant="h3" sx={{ width: '75%', margin: 1 }}>
                                            {p.text}
                                        </Typography>
                                    );

                                default:
                                    return null;
                            }
                        })}
                    </Box>

                    {/* Week Schedule */}
                    <Box>
                        <WeekSchedule
                            selectedSlots={mergeClassesWithConstraints(classesSlots, selectedSlots)}
                            onSelectNewSlot={onSelectNewSlot}
                        />
                    </Box>

                    <Box sx={{ flexGrow: 1, justifyContent: 'flex-end', display: 'flex', margin: 2 }}>
                        <Button variant="contained" size="large" endIcon={<ArrowForwardIcon />} onClick={clickContinueHandler}>
                            Continuar
                        </Button>
                    </Box>
                </Card>
            </MainCard>

            {selectionConfig ? (
                <Modal
                    open={configModalOpen}
                    onClose={() => setConfigModalOpen(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h4" component="h2">
                            Configurar restrição de horário
                        </Typography>
                        <Box sx={{ margin: 2 }}>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                {selectionConfig.day}, {timeSlotIdxToTime(selectionConfig.start)} até{' '}
                                {timeSlotIdxToTime(selectionConfig.end)}
                            </Typography>
                        </Box>

                        <Box sx={{ margin: 2 }}>
                            <TextField label="Nome" variant="standard" value={slotNameInput} onChange={slotNameInputChangeHandler} />
                        </Box>

                        <Button sx={{ margin: 1 }} variant="contained" onClick={() => confirmSelectionHandler('Obrigatória')} color="error">
                            Restrito
                        </Button>
                        <Button sx={{ margin: 1 }} variant="contained" onClick={() => confirmSelectionHandler('Opcional')} color="warning">
                            Flexível
                        </Button>
                        <Button sx={{ margin: 1 }} variant="contained" onClick={() => reset()}>
                            Cancelar
                        </Button>
                    </Box>
                </Modal>
            ) : null}
        </>
    );
};

export default SelectConstraintsView;
