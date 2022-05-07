// assets
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import { Button, Card, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import Student1 from '../../../assets/images/student1.svg';

// Content
const content = [
    {
        type: 'header',
        text: 'Como funciona a matrícula'
    },
    {
        type: 'body',
        text: 'A UFRGS oferece diversas matérias que podem ser escolhidas pelos alunos. No entanto, as vagas em cada disciplina são limitadas e normalmente existem mais candidatos que vagas para cada disciplina. Para isso, precisamos garantir que as vagas sejam distribuídas de maneira justa, respeitando diversos critérios como desempenho do aluno e progressão no curso. A matrícula é feita em etapas: encomenda e ajuste.'
    },
    {
        type: 'header',
        text: 'Encomenda de Matrícula'
    },
    {
        type: 'body',
        text: 'A encomenda de matrícula é quando o aluno escolhe um grupo de disciplinas que tem a intenção de cursar. A escolha é feita em blocos de preferência, e após a confirmação, o aluno aguarda o resultado da seleção feita pelo sistema da UFRGS. Quando o período de encomenda acaba, o sistema distribui as vagas para os alunos.'
    },
    {
        type: 'header',
        text: 'Ajuste de Matrícula'
    },
    {
        type: 'body',
        text: 'Quando a encomenda é finalizada, algumas turmas podem não ficar completamente preenchidas, ou haver desistências. No período de ajuste, alunos podem tentar concorrer a uma vaga mais uma vez.'
    },
    {
        type: 'header',
        text: 'O que fazer agora?'
    },
    {
        type: 'body',
        text: 'Durante os próximos passos, você irá gerar os blocos de preferência para a encomenda de matrícula. Isso é feito automáticamente pelo Sismat2, e você só precisa indicar quais turmas são de interesse, e quais são suas restrições de horário. Ao final do processo, o sistema gera os blocos de preferência automáticamente e submete para o sistema de encomenda de matrícula da UFRGS.'
    }
];

// =============================|| TABLER ICONS ||============================= //

const Enrollment = () => {
    const navigate = useNavigate();

    const clickContinueHandler = () => {
        navigate('/enrollment/select-classes');
    };

    return (
        <MainCard title="Encomenda de Matrícula">
            <Card sx={{ overflow: 'hidden' }}>
                <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
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

                <Box sx={{ margin: 4, display: 'flex', justifyContent: 'center' }}>
                    <img src={Student1} alt="Estudante" style={{ width: '25%' }} />
                </Box>

                <Box sx={{ flexGrow: 1, justifyContent: 'flex-end', display: 'flex', margin: 2 }}>
                    <Button variant="contained" size="large" endIcon={<ArrowForwardIcon />} onClick={clickContinueHandler}>
                        Continuar
                    </Button>
                </Box>
            </Card>
        </MainCard>
    );
};

export default Enrollment;
