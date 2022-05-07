/* eslint-disable react/self-closing-comp */
/* eslint-disable arrow-body-style */
import { ArrowForward as ArrowForwardIcon, Download as DownloadIcon } from '@mui/icons-material';
import { Avatar, Button, Card, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';

const ConfirmEnrollmentView = () => {
    const navigate = useNavigate();
    const {
        state: { selectedSlots, selectedClasses }
    } = useLocation();

    console.log(selectedSlots, selectedClasses);

    const clickContinueHandler = () => {
        navigate('/dashboard');
    };

    if (!selectedClasses) return <div>Erro</div>;

    return (
        <MainCard title="Confirmar matrícula">
            <Card sx={{ overflow: 'hidden' }}>
                <Typography variant="body2">
                    Tudo pronto. Aqui estão nossas sugestões de grade para as suas preferências e restrições. Escolha a ordem de preferência
                    e sua encomenda de matrícula estará pronta.
                </Typography>

                {/* List of classes */}
                <Box>
                    <List>
                        {selectedClasses.map((selectedClass) => (
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar src={selectedClass.professors[0].imageUrl || undefined}>P</Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`${selectedClass.courseCode} - ${selectedClass.name} (Turma ${selectedClass.classId})`}
                                    secondary={`Professor(a): ${selectedClass.professors[0].name}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>

                <Box sx={{ flexGrow: 1, justifyContent: 'flex-end', display: 'flex', margin: 2 }}>
                    <Button variant="contained" size="large" endIcon={<DownloadIcon />} sx={{ margin: 1 }}>
                        Baixar grade de horário
                    </Button>
                    <Button
                        variant="contained"
                        size="large"
                        endIcon={<ArrowForwardIcon />}
                        sx={{ margin: 1 }}
                        onClick={clickContinueHandler}
                    >
                        Continuar
                    </Button>
                </Box>
            </Card>
        </MainCard>
    );
};

export default ConfirmEnrollmentView;
