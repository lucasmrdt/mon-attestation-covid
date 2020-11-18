/* eslint-disable react/jsx-pascal-case */

import React, { useEffect, useRef } from 'react';
import { Button, message } from 'antd';
import styled from '@emotion/styled';
import RightOutlined from '@ant-design/icons/RightOutlined';

import { Anchor, Headings, OrderedList, Paragraph, Article } from 'components';

import { FormStore } from '../form.store';

const isMobile = typeof window.orientation !== 'undefined';

const Title = styled(Headings.h1)`
  text-align: center;
  margin: auto;
  margin-bottom: 50px;
  margin-top: 70px;
`;

const Steps = styled(OrderedList)`
  margin-top: 60px;
`;

const LegalNotice = styled(Paragraph)`
  font-size: 14px;
  font-style: italic;
`;

const StyledButton = styled(Button)`
  position: fixed;
  bottom: 40px;
  height: auto;
  padding: 10px 25px;
  border: none;
  border-radius: 5px;
  display: flex;
  align-items: center;
  span {
    font-size: 17px;
    color: #111216;
  }
`;

const Container = styled(Article)`
  padding-bottom: 120px;
`;

interface Props {
  onSubmit: () => void;
}

const InstructionScreen: React.FC<Props> = ({ onSubmit }) => {
  const legalNoticeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const af = requestAnimationFrame(() => {
      const warned = FormStore.get('warned');
      if (warned) {
        return;
      }
      message.warn({
        content:
          'Ouvrez le site sur votre navigateur préféré et non sur les réseaux sociaux.',
        style: isMobile && {
          textAlign: 'left',
        },
      });
      FormStore.set('warned', true);
    });

    return () => cancelAnimationFrame(af);
  }, []);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) =>
        entries.length > 0 &&
        entries[0].isIntersecting &&
        FormStore.set('rgpdWarned', true),
    );
    if (legalNoticeRef.current) {
      observer.observe(legalNoticeRef.current);
    }
  }, []);

  return (
    <>
      <Container>
        <Title>Générer votre attestation de déplacement COVID-19</Title>
        <Headings.h2>
          Votre attestation officielle en quelques secondes. Entrez vos
          informations <b>une seule et unique fois</b>.
          <br />
          <br />
          Utilisez votre navigateur préféré et non ceux des réseaux sociaux.
        </Headings.h2>
        <Steps>
          <li>
            <Paragraph>
              Remplissez vos informations lors de votre première visite
            </Paragraph>
          </li>
          <li>
            <Paragraph>Choisissez le ou les motifs de déplacement</Paragraph>
          </li>
          <li>
            <Paragraph>
              Et voilà votre attestation de déplacement officielle COVID-19 est
              prête !
            </Paragraph>
          </li>
        </Steps>
        <LegalNotice>
          Toutes vos informations personnelles sont stockées localement à votre
          appareil et ne sont jamais envoyé à un serveur. La web app est basée
          sur le projet officiel du ministère de l'intérieur{' '}
          <Anchor
            href="https://media.interieur.gouv.fr/deplacement-covid-19/"
            target="_blank"
          >
            COVID-19 ATTESTATION DE DÉPLACEMENT DÉROGATOIRE
          </Anchor>
          . Cette web app génère donc un document officiel de déplacement
          COVID-19.
          <br />
          <br />
          <span ref={legalNoticeRef}>
            Cette web app utilise le service Google Analytics dans l'unique but
            de comptabiliser le nombre de vues générées sur le site, aucune
            information personnelle n'est transmise ou sauvegardée par ce tiers.
          </span>
        </LegalNotice>
      </Container>
      <StyledButton onClick={onSubmit}>
        Commencer
        <RightOutlined />
      </StyledButton>
    </>
  );
};

// @ts-ignore
InstructionScreen.whyDidYouRender = true;

export default React.memo(InstructionScreen);
