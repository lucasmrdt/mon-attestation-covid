/* eslint-disable react/jsx-pascal-case */

import React, { useCallback } from 'react';
import { Checkbox, message } from 'antd';
import styled from '@emotion/styled';

import { IReason } from 'services/Generator';

import Form from '../components/FormSection';
import { useForm } from '../store.form';
import { Anchor } from 'components';

const StyledCheckbox = styled(Checkbox)`
  font-size: 14px;
  font-style: italic;
  background-color: transparent;
  color: #fff;
  margin-bottom: 30px;
  width: 100%;
  font-style: normal;
  font-family: ${(p) =>
    // @ts-ignore
    p.theme.fonts.sansSerif};

  &:focus {
    outline: none;
  }
`;

const Emoji = styled.span`
  margin-right: 10px;
  margin-left: 5px;
`;

interface Props {
  onSubmit: () => void;
}

const ReasonsScreen: React.FC<Props> = ({ onSubmit }) => {
  const [reasons, setReasons] = useForm('reasons');

  const onSubmitWrapper = useCallback(() => {
    if (reasons.length === 0) {
      message.error('Vous devez sélectionner au moins un motif');
    } else {
      onSubmit();
    }
  }, [onSubmit, reasons]);
  const onChange = useCallback((value: string[]) => setReasons(value), [
    setReasons,
  ]);

  return (
    <Form
      title={'Choisissez un ou plusieurs motifs'}
      button={'Télécharger mon attestation'}
      onSubmit={onSubmitWrapper}
    >
      <Checkbox.Group
        style={{ width: '100%' }}
        // @ts-ignore
        onChange={onChange}
      >
        <StyledCheckbox value={IReason.work}>
          <Emoji>💼</Emoji> Déplacements entre le domicile et le lieu d’exercice
          de l’activité professionnelle ou un établissement d’enseignement ou de
          formation, déplacements professionnels ne pouvant être différés{' '}
          <Anchor
            href="https://media.interieur.gouv.fr/deplacement-covid-19/#footnote2"
            target="_blank"
          >
            [2]
          </Anchor>
          , déplacements pour un concours ou un examen.
        </StyledCheckbox>
        <StyledCheckbox value={IReason.purchase}>
          <Emoji>🛒</Emoji> Déplacements pour effectuer des achats de
          fournitures nécessaires à l'activité professionnelle, des achats de
          première nécessité{' '}
          <Anchor
            href="https://media.interieur.gouv.fr/deplacement-covid-19/#footnote3"
            target="_blank"
          >
            [3]
          </Anchor>{' '}
          dans des établissements dont les activités demeurent autorisées, le
          retrait de commande et les livraisons à domicile.
        </StyledCheckbox>
        <StyledCheckbox value={IReason.health}>
          <Emoji>🚑</Emoji> Consultations, examens et soins ne pouvant être
          assurés à distance et l’achat de médicaments.
        </StyledCheckbox>
        <StyledCheckbox value={IReason.family}>
          <Emoji>👨‍👩‍👦</Emoji> Déplacements pour motif familial impérieux, pour
          l'assistance aux personnes vulnérables et précaires ou la garde
          d'enfants.
        </StyledCheckbox>
        <StyledCheckbox value={IReason.handicap}>
          <Emoji>♿️</Emoji> Déplacement des personnes en situation de handicap
          et leur accompagnant.
        </StyledCheckbox>
        <StyledCheckbox value={IReason.pets}>
          <Emoji>🏃🏻‍♂️</Emoji> Déplacements brefs, dans la limite d'une heure
          quotidienne et dans un rayon maximal d'un kilomètre autour du
          domicile, liés soit à l'activité physique individuelle des personnes,
          à l'exclusion de toute pratique sportive collective et de toute
          proximité avec d'autres personnes, soit à la promenade avec les seules
          personnes regroupées dans un même domicile, soit aux besoins des
          animaux de compagnie.
        </StyledCheckbox>
        <StyledCheckbox value={IReason.summons}>
          <Emoji>📁</Emoji> Convocation judiciaire ou administrative et pour se
          rendre dans un service public.
        </StyledCheckbox>
        <StyledCheckbox value={IReason.missions}>
          <Emoji>⚖️</Emoji> Participation à des missions d'intérêt général sur
          demande de l'autorité administrative.
        </StyledCheckbox>
        <StyledCheckbox value={IReason.children}>
          <Emoji>👶🏻</Emoji> Déplacement pour chercher les enfants à l’école et à
          l’occasion de leurs activités périscolaires.
        </StyledCheckbox>
      </Checkbox.Group>
    </Form>
  );
};

// @ts-ignore
ReasonsScreen.whyDidYouRender = true;

export default React.memo(ReasonsScreen);
