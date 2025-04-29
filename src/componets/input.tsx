import React from "react";
import { View, StyleSheet, TextInput as RNTextInput } from "react-native";
import { TextInput, Text, withTheme, MD3Theme } from "react-native-paper";

interface InputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: boolean;
  errorText?: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  placeholder?: string;
  inputRef?: React.RefObject<RNTextInput>;
  returnKeyType?: "done" | "next" | "go" | "search" | "send";
  onSubmitEditing?: () => void;
  theme: MD3Theme;
}

const Input = ({
  label,
  value,
  onChangeText,
  error = false,
  errorText = "",
  secureTextEntry = false,
  keyboardType = "default",
  placeholder,
  inputRef,
  returnKeyType = "done",
  onSubmitEditing,
  theme, // Agora o `theme` é passado como prop pelo `withTheme`
}: InputProps) => {
  const { colors } = theme;

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        mode="outlined"
        label={label}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        error={error}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        style={[
          styles.input,
          { backgroundColor: colors.secondary }, // Cor de fundo
          { color: colors.primary }, // Cor do texto
        ]}
        outlineColor={colors.secondary} // Cor da borda
        activeOutlineColor={error ? colors.error : undefined}
        textColor={colors.primary} // Cor do texto
        placeholderTextColor={colors.primary}
        theme={{
          roundness: 12,
          colors: {
            placeholder: colors.primary,
            primary: colors.primary,
            error: colors.error,
          },
        }}
        contentStyle={styles.contentStyle}
      />

      {error && errorText ? (
        <Text style={styles.errorText}>{errorText}</Text>
      ) : null}
    </View>
  );
};

// Envolvendo o componente com `withTheme` para passar o tema como prop
export default withTheme(Input);

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  input: {
    // estilo adicional aqui, se necessário
  },
  contentStyle: {
    paddingVertical: 12,
  },
  errorText: {
    color: "red",
    marginTop: 4,
    marginLeft: 8,
    fontSize: 12,
  },
});
