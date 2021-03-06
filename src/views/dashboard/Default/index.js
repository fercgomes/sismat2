// material-ui
import { Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
// project imports
import EarningCard from './EarningCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <EarningCard isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalOrderLineChartCard isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeDarkCard isLoading={isLoading} />
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeLightCard isLoading={isLoading} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    {/* <Grid item xs={12} md={8}>
                        <TotalGrowthBarChart isLoading={isLoading} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <PopularCard isLoading={isLoading} />
                    </Grid> */}
                    <Grid item xs={12} md={8}>
                        <MainCard title="Sobre o Portal do Aluno">
                            <Typography variant="body2">
                                Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie
                                magna alissa. Ut enif ad minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea
                                commons construal. Duos aube grue dolor in reprehended in voltage veil esse colum doolie eu fujian bulla
                                parian. Exceptive sin ocean cuspidate non president, sunk in culpa qui officiate descent molls anim id est
                                labours.
                            </Typography>
                            <Typography variant="body2">
                                Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie
                                magna alissa. Ut enif ad minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea
                                commons construal. Duos aube grue dolor in reprehended in voltage veil esse colum doolie eu fujian bulla
                                parian. Exceptive sin ocean cuspidate non president, sunk in culpa qui officiate descent molls anim id est
                                labours.
                            </Typography>
                        </MainCard>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <MainCard title="Aten????o Veterano!">
                            <Typography variant="body2">
                                A partir de 2016 a pr??tica de atividades de trote que envolvam viol??ncia f??sica, sexual, psicol??gica, ou
                                qualquer forma de desrespeito ?? vida e ?? dignidade humana ensejar?? a realiza????o de processo disciplinar
                                contra o discente respons??vel, ainda que os trotes tenham sido praticados fora das depend??ncias da
                                universidade (altera????o trazida pela Decis??o 028/2016 do Conselho Universit??rio ??? CONSUN). A realiza????o de
                                processo disciplinar n??o exclui a comunica????o ao Minist??rio P??blico para exame de eventual responsabilidade
                                penal. As normas para realiza????o das atividades de trote na UFRGS s??o definidas pela Decis??o 02/2001 do
                                CONSUN, dispon??vel aqui. Pr??-Reitoria de Gradua????o
                            </Typography>
                        </MainCard>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <img
                            src="https://www1.ufrgs.br/PortalEnsino/GraduacaoAluno/imgs/COVID-19_PESQUISA_GT_SAUDE.png"
                            alt="hjk"
                            style={{ width: '100%' }}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
