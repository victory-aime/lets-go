import React, { FC } from 'react';
import { View } from 'react-native';
import { BaseButton } from '_components/base-button/BaseButton';
import { Dialog, Portal } from 'react-native-paper';
import { ButtonVariants } from '_components/base-button/interface/button';
import { BaseIcon } from '_components/base-icon/BaseIcon';
import { BaseText, TextVariant } from '_components/base-text';
import { WarningIcon } from '_assets/svg';
import { lightColors } from '_theme/colors';
import { useTranslation } from 'react-i18next';
import { BaseDialogProps } from './interface/dialog';

export const BaseDialog: FC<BaseDialogProps> = ({
  onClose,
  cancelTitle = 'COMMON.CANCEL',
  validateTitle = 'COMMON.VALIDATE',
  onValidate,
  title = 'Modal',
  type = 'success',
  children,
  ...rest
}) => {
  const { t } = useTranslation();
  return (
    <Portal>
      <Dialog
        {...rest}
        visible={rest.visible}
        onDismiss={() => onClose(!rest.visible)}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            padding: 20,
          }}
        >
          <BaseIcon
            icon={<WarningIcon fill={lightColors.surface} />}
            variant={'square'}
            colorsScheme={'danger'}
          />
          <BaseText variant={TextVariant.L}>{t(title)}</BaseText>
        </View>
        <Dialog.Content>{children}</Dialog.Content>
        {onValidate && (
          <Dialog.Actions>
            <BaseButton
              colorsScheme={'none'}
              mode={ButtonVariants.UNSTYLED}
              onPress={() => onClose(!rest.visible)}
            >
              {t(cancelTitle)}
            </BaseButton>
            <BaseButton
              colorsScheme={type}
              mode={ButtonVariants.UNSTYLED}
              onPress={onValidate}
            >
              {t(validateTitle)}
            </BaseButton>
          </Dialog.Actions>
        )}
      </Dialog>
    </Portal>
  );
};
