/* eslint-disable react/self-closing-comp */
/* eslint-disable arrow-body-style */
import { Analytics, ArrowForward as ArrowForwardIcon, ExpandMoreOutlined, MoreVert as MoreVertIcon } from '@mui/icons-material';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Avatar,
    Button,
    Card,
    CardHeader,
    Chip,
    Divider,
    Grid,
    IconButton,
    Paper,
    Tooltip,
    Typography
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';
import findCoursePossibilities from 'utils/portal/classes';
import CourseOffersData from '../../../../data/course-offers.json';

const content = [
    { type: 'header', text: 'Instruções' },
    {
        type: 'body',
        text: 'Abaixo estão as disciplinas que você pode se matricular no próximo semestre. Essa lista se baseia no seu currículo (disciplinas já concluídas) e desempenho.'
    },
    {
        type: 'body',
        text: 'Você pode clicar em cada disciplina e verificar quais turmas estão disponíveis, e seus respectivos horários e professores ministrantes.'
    },
    { type: 'header', text: 'Tipos de escolha' },
    {
        type: 'body',
        text: 'Você pode indicar preferência estrita ou opcional para uma turma.'
    }
];

const SelectClassesView = () => {
    const navigate = useNavigate();

    const [classSelections, setClassSelections] = React.useState({});

    console.log(classSelections);

    const hasNotDoneCourseKeys = findCoursePossibilities();

    const currentSemester = '2021/2';
    const courseOffers = CourseOffersData[currentSemester];

    const clickContinueHandler = () => {
        navigate('/enrollment/select-constraints', { state: { selectedClasses: Object.values(classSelections) } });
    };

    const confirmHandler = () => {
        navigate('/constraints', { state: { selectedClasses: classSelections } });
    };

    const classMarkHandler = (courseCode, classId, type) => {
        if (!classSelections[courseCode]) {
            // CHeck time conflict

            const addition = {
                classId,
                courseCode,
                type,
                name: courseOffers[courseCode].name,
                professors: courseOffers[courseCode].offers[classId].professors,
                schedule: courseOffers[courseCode].offers[classId].schedule
            };

            let hasConflict = false;
            Object.values(classSelections).forEach((selection) => {
                Object.keys(selection.schedule).forEach((day) => {
                    Object.keys(addition.schedule).forEach((day2) => {
                        if (day === day2) {
                            if (selection.schedule[day].startTime === addition.schedule[day2].startTime) {
                                hasConflict = true;
                            }
                        }
                    });
                });
            });

            if (hasConflict) {
                alert('Essa turma não pode ser adicionada por um conflito de horário. Tenta outra turma.');
                return;
            }

            setClassSelections({
                ...classSelections,
                [courseCode]: addition
            });
        } else {
            alert('Já selecionou essa turma');
        }
    };

    const courseIsSelected = (courseCode, classId) => {
        if (classSelections[courseCode]) {
            return true;
        }

        return false;
    };

    const classIsSelected = (courseCode, classId) => {
        if (classSelections[courseCode]) {
            return classSelections[courseCode].classId === classId;
        }

        return false;
    };

    const removeClassHandler = (courseCode, classId) => {
        if (classSelections[courseCode]) {
            const { [courseCode]: a, ...rest } = classSelections;

            setClassSelections({ ...rest });
        }
    };

    return (
        <MainCard title="Escolher disciplinas">
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

                {/* List of classes */}
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Paper elevation={2} sx={{ padding: 2, height: '100%', margin: 1 }}>
                            <Typography variant="h4">Possibilidade de matrícula</Typography>

                            {hasNotDoneCourseKeys.map((courseKey) => {
                                const course = courseOffers[courseKey];

                                if (!course) return null;
                                const offers = course.offers;
                                const offersKeys = Object.keys(course.offers);

                                return (
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreOutlined />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'flex-start'
                                                }}
                                            >
                                                <Typography>
                                                    {course.name} ({course.code})
                                                </Typography>
                                                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                                    <Chip
                                                        size="small"
                                                        icon={<Analytics />}
                                                        label={`Créditos: ${course.credits}`}
                                                        sx={{ marginRight: 1 }}
                                                    />
                                                    <Chip size="small" icon={<Analytics />} label={`Índice de reprovação: N/A`} />
                                                </Box>
                                            </div>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <div></div>

                                            <Grid container spacing={2}>
                                                {offersKeys.map((offeredClassKey) => {
                                                    const offer = offers[offeredClassKey];
                                                    const offerScheduleKeys = Object.keys(offer.schedule);
                                                    const offerSchedule = offer.schedule;

                                                    return (
                                                        <Grid item xs>
                                                            <Typography variant="h6">
                                                                Turma {offeredClassKey}
                                                                {classIsSelected(courseKey, offeredClassKey) ? ` (Selecionado)` : null}
                                                            </Typography>

                                                            {offerScheduleKeys.map((offerScheduleKey) => {
                                                                return (
                                                                    <Typography>
                                                                        {offerScheduleKey}
                                                                        {`\t`}
                                                                        {offerSchedule[offerScheduleKey].startTime} até{' '}
                                                                        {offerSchedule[offerScheduleKey].endTime}
                                                                    </Typography>
                                                                );
                                                            })}

                                                            {offers[offeredClassKey].professors.map((prof) => {
                                                                return (
                                                                    <Card elevation={2} sx={{ maxWidth: 345, marginBottom: 2 }}>
                                                                        <CardHeader
                                                                            avatar={
                                                                                <Avatar src={prof.imageUrl || undefined}>
                                                                                    {prof.name[0]}
                                                                                </Avatar>
                                                                            }
                                                                            action={
                                                                                <IconButton aria-label="settings">
                                                                                    <MoreVertIcon />
                                                                                </IconButton>
                                                                            }
                                                                            title={prof.name}
                                                                            subheader={prof.position || ''}
                                                                        ></CardHeader>
                                                                    </Card>
                                                                );
                                                            })}

                                                            <div>
                                                                {!courseIsSelected(courseKey, offeredClassKey) ? (
                                                                    <>
                                                                        <Tooltip title="Disciplina precisa estar na encomenda de matrícula">
                                                                            <Button
                                                                                sx={{ margin: 1 }}
                                                                                variant="contained"
                                                                                color="error"
                                                                                onClick={() =>
                                                                                    classMarkHandler(
                                                                                        courseKey,
                                                                                        offeredClassKey,
                                                                                        'Obrigatória'
                                                                                    )
                                                                                }
                                                                            >
                                                                                Precisa estar na matrícula
                                                                            </Button>
                                                                        </Tooltip>
                                                                        <Tooltip title="Disciplina pode estar na encomenda de matrícula">
                                                                            <Button
                                                                                sx={{ margin: 1 }}
                                                                                variant="contained"
                                                                                color="warning"
                                                                                onClick={() =>
                                                                                    classMarkHandler(courseKey, offeredClassKey, 'Opcional')
                                                                                }
                                                                            >
                                                                                Pode estar na matrícula
                                                                            </Button>
                                                                        </Tooltip>
                                                                    </>
                                                                ) : (
                                                                    <Box>
                                                                        <Button
                                                                            sx={{ margin: 1 }}
                                                                            onClick={() => removeClassHandler(courseKey, offeredClassKey)}
                                                                            variant="contained"
                                                                        >
                                                                            Remover
                                                                        </Button>
                                                                    </Box>
                                                                )}
                                                            </div>
                                                        </Grid>
                                                    );
                                                })}
                                            </Grid>
                                        </AccordionDetails>
                                    </Accordion>
                                );
                            })}
                        </Paper>
                    </Grid>
                    {/* Selected classes */}
                    <Grid item xs={4}>
                        <Paper elevation={2} sx={{ padding: 2, height: '100%', margin: 1 }}>
                            <Typography variant="h4">Turmas selecionadas</Typography>

                            {Object.keys(classSelections).map((classKey) => {
                                const c = classSelections[classKey];
                                const schedule = courseOffers[classKey].offers[c.classId].schedule;
                                const days = Object.keys(schedule);
                                return (
                                    <Card elevation={1} sx={{ padding: 1, margin: 1 }}>
                                        <Typography>
                                            {classKey} | Turma {c.classId} | {c.type}
                                        </Typography>

                                        <Typography variant="caption">{c.name}</Typography>
                                        <Divider />

                                        <Typography variant="caption">{c.professors[0].name}</Typography>
                                        <Divider />

                                        {days.map((day) => {
                                            return (
                                                <Typography variant="caption">
                                                    {day} {schedule[day].startTime} - {schedule[day].endTime}, {`  `}
                                                </Typography>
                                            );
                                        })}
                                        <Divider />
                                        <Button
                                            variant="contained"
                                            size="small"
                                            sx={{ margin: 1 }}
                                            onClick={() => removeClassHandler(classKey, c.classId)}
                                        >
                                            Remover
                                        </Button>
                                    </Card>
                                );
                            })}
                        </Paper>
                    </Grid>
                </Grid>

                <Box sx={{ flexGrow: 1, justifyContent: 'flex-end', display: 'flex', margin: 2 }}>
                    <Button variant="contained" size="large" endIcon={<ArrowForwardIcon />} onClick={clickContinueHandler}>
                        Continuar
                    </Button>
                </Box>
            </Card>
        </MainCard>
    );
};

export default SelectClassesView;
