import { StyleSheet } from 'react-native';
import { theme } from '@/presentation/theme';

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: theme.spacing.xl,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  error: {
    color: theme.colors.error,
    marginBottom: theme.spacing.md,
  },
  success: {
    color: theme.colors.success,
    marginBottom: theme.spacing.md,
  },
  button: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    marginTop: theme.spacing.md,
  },
  switchButton: {
    alignItems: 'center',
    padding: theme.spacing.sm,
  },
});
