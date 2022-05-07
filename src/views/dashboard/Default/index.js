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
                        <MainCard title="Atenção Veterano!">
                            <Typography variant="body2">
                                A partir de 2016 a prática de atividades de trote que envolvam violência física, sexual, psicológica, ou
                                qualquer forma de desrespeito à vida e à dignidade humana ensejará a realização de processo disciplinar
                                contra o discente responsável, ainda que os trotes tenham sido praticados fora das dependências da
                                universidade (alteração trazida pela Decisão 028/2016 do Conselho Universitário – CONSUN). A realização de
                                processo disciplinar não exclui a comunicação ao Ministério Público para exame de eventual responsabilidade
                                penal. As normas para realização das atividades de trote na UFRGS são definidas pela Decisão 02/2001 do
                                CONSUN, disponível aqui. Pró-Reitoria de Graduação
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
