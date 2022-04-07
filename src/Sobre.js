import * as React from 'react';
import {Button, Box, CardMedia, CardContent, Card, Link, Paper, Typography} from "@mui/material";

function Sobre(props) {

    return (
        <Box sx={{margin: '2%', paddingLeft: '5%', paddingRight: '5%'}}>
            <Box sx={{marginBottom: '5%', objectFit: 'fill'}}>
                <img src={'/sobre.jpg'} width={'100%'}/>
            </Box>
            <Typography variant={'body1'} paragraph={true}>
                O Departamento de Informática (DI) foi criado por Despacho de 4 de Março de 1996 pelo Presidente do
                Conselho Directivo da Escola Superior de Tecnologia de Viseu, coincidindo, à data, com a Área Científica
                de Informática.
            </Typography>

            <Typography variant={'h6'} paragraph={true}>
                Mensagem do Director de Departamento
            </Typography>

            <Typography variant={'body1'} paragraph={true}>
                As Tecnologias da Informação, enquanto elemento importante na disponibilização de informação, têm nas
                últimas décadas desempenhado um papel crucial nas organizações em particular e na sociedade em geral. A
                procura de mais e melhores Tecnologias de Informação tem sido de facto uma preocupação constante das
                organizações e dos cidadãos.
            </Typography>
            <Typography variant={'body1'} paragraph={true}>
                A qualidade das Tecnologias da Informação, para além de outros factores, tem sido um dos aspectos
                relevantes para a sua adopção plena nas organizações e pelos cidadãos em geral. Desta forma, a formação
                em áreas relacionadas com as Tecnologias da Informação assume particular relevância para que as soluções
                concebidas sejam cada vez mais eficientes e aceites.
            </Typography>
            <Typography variant={'body1'} paragraph={true}>
                Atento às várias evoluções no domínio, o Departamento de Informática tem como missão prestar formação em
                áreas relacionadas com as Tecnologias da Informação. Assim, é assegurada pelo Departamento de
                Informática formação relacionada com a análise, concepção, implementação e exploração de TIs.
            </Typography>
            <Typography variant={'body1'} paragraph={true}>
                Para além da formação, o Departamento de Informática tem como objectivo a prestação de serviços. Neste
                âmbito, o departamento está habilitado para efectuar projectos de natureza diversa, entre outros:
            </Typography>
            <Typography variant={'body1'} paragraph={true}>
                <ul>
                    <li>análise, concepção e implementação de Sistemas de Informação;</li>
                    <li>planeamento, projecto e administração de redes informáticas;</li>
                    <li>planeamento, configuração e administração de sistemas informáticos;</li>
                    <li>análise, concepção e implementação de aplicação multimédia.</li>
                </ul>


                O projecto do Departamento de Informática assenta em dois recursos importantes: os recursos humanos que
                o constituem e os meios materiais utilizados. No que concerne aos recursos humanos, o departamento
                dispõe de um conjunto de docentes com formação abrangente nas áreas relacionadas com as Tecnologias de
                Informação. É de salientar que para cada um destes dois aspectos o departamento tem permanentemente
                procurado estar actualizado. Nesse sentido, o corpo docente tem efectuado formação pós-graduada.
                Relativamente aos recursos materiais, o departamento tem procurado acompanhar as constantes evoluções
                tecnológicas existentes no mercado.
            </Typography>

            <Typography variant={'h6'} paragraph={true}>
                Enquadramento
            </Typography>
            <Typography variant={'body1'} paragraph={true}>
                Na actual sociedade da informação, cada vez mais exigente, as empresas e organizações em geral,
                independentemente da sua dimensão e sector de actividade, têm de se preocupar com a racionalização das
                suas funções e com o tratamento da informação de que necessitam para atingir os seus objectivos. A
                informática, ou melhor, os sistemas de informação assumem, neste contexto, um papel crucial, na medida
                em que podem promover e sustentar processos de optimização, funcionando como fornecedores de informação
                em tempo real e como instrumentos de inovação e progresso.
            </Typography>
            <Typography variant={'body1'} paragraph={true}>
                As organizações confrontam-se com a necessidade de sistemas integrados de extracção, armazenamento e
                disponibilização de grandes volumes de informação, bem como de acesso a redes de comunicação e à
                informação disponível na Internet. No entanto, verifica-se que os sistemas informáticos constituem, por
                vezes, um elemento ávido de recursos financeiros e humanos, distante dos problemas das organizações.
                Assim, um dos aspectos com que se debatem as organizações é a dificuldade de exploração e rentabilização
                dos avançados sistemas informáticos disponíveis.
            </Typography>
            <Typography variant={'body1'} paragraph={true}>
                Estas preocupações traduzem-se num conjunto de tarefas que exigem dos profissionais envolvidos o domínio
                das tecnologias de informação, conjugadas com o conhecimento dos problemas reais. Contingências de vária
                ordem reclamam a intervenção de técnicos que, pela sua formação especializada, possam ajudar a
                solucionar adequadamente problemas que afectam a sociedade, dando origem a uma tendência em expansão:
                responder às solicitações cada vez mais complexas, exigentes e variadas do mercado de trabalho. Soma-se
                a esta alteração o aumento da população estudantil que pretende frequentar o ensino superior e uma
                procura diversificada de outras vias de ensino mais variadas e dirigidas à vida activa e ao mundo do
                trabalho. A diversificação do ensino superior, a especialização dos cursos e a oferta de uma formação
                científica, técnica e prática integrada parecem ser a resposta para as carências enunciadas.
            </Typography>
            <Typography variant={'body1'} paragraph={true}>
                Os cursos do D.I. surgiram, neste âmbito, numa perspectiva de diversificação da oferta da Escola
                Superior de Tecnologia de Viseu (ESTV), orientada para as necessidades, interesses e planos de
                desenvolvimento da região em que se insere, sem esquecer que tais necessidades e interesses reflectem
                tendências universais, tendo também projecção e impacto a nível nacional.
            </Typography>
            <Typography variant={'h6'} paragraph={true}>
                Objetivos
            </Typography>
            <Typography variant={'body1'} paragraph={true}>
                Para além da formação, o Departamento de Informática tem como objectivo a prestação de serviços. Neste
                âmbito, o departamento possui recursos humanos e materiais que lhe permitem efectuar projectos de
                natureza diversa, nomeadamente:

                <ul>
                    <li>análise, conceção e implementação de Sistemas de Informação;</li>
                    <li>planeamento, projeto e administração de redes informáticas;</li>
                    <li> planeamento, configuração e administração de sistemas informáticos;</li>
                    <li>análise, conceção e implementação de aplicação multimédia.</li>
                </ul>


            </Typography>
        </Box>
    )
}

export default Sobre;