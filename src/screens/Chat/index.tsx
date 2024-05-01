import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native"
import { AppFrame } from "../../components/app-frame"
import { ScrollView, TextInput } from "react-native-gesture-handler"
import Arrow from '../../../assets/icons/arrow-white.svg';
import React, { useRef, useState } from "react";
import Toast from "react-native-toast-message";
import { useAuth } from "../../context/authContext";
import { AskCommand } from "../../api/commands/Ask";

type Message = {
    sender: "user" | "assistant";
    content: string;
}

type MessageWrapperProps = {
    message: Message;
}

const MessageWrapper: React.FC<MessageWrapperProps> = ({
    message
}: MessageWrapperProps) => {
    return (
        <View style={{
            backgroundColor: message.sender === "assistant" ? "white" : "#13164B",
            alignSelf: message.sender === "assistant" ? "flex-start" : "flex-end",
            maxWidth: "70%",
            marginLeft: message.sender === "assistant" ? 10 : 0,
            marginRight: message.sender === "assistant" ? 0 : 10,
            marginTop: 15,
            borderRadius: 10,
        }}>
            <Text
            style={{
                paddingHorizontal: 10,
                paddingVertical: 10,
                fontSize: 15,
                color: message.sender === "assistant" ? "#13164B" : "white"
            }}
            >
                { message.content }
            </Text>
        </View>
    )
}

export const Chat = () => {
    const [currentMessage, setCurrentMessage] = useState("")
    const [isWaitingForAnswer, setIsWaitingForAnswer] = useState(false)
    const [messages, setMessages] = useState<Array<Message>>([
        {
            sender: "assistant",
            content: "Olá, em que posso lhe ajudar hoje ?"
        }
    ]);
    const keyboardRef = useRef<TextInput>(null);
    const auth = useAuth();

    function sendMessage() {
        const token = auth.authState?.token
        if (!token) return
        if (!currentMessage.trim()) {
            Toast.show({
                type: "error",
                text1: "Mensagem inválida",
                text2: "Você deve digitar uma mensagem válida."
            })
            setCurrentMessage("")
            return
        }
        setMessages(currentMessages => [
            ...currentMessages,
            {
                sender: "user",
                content: currentMessage
            }
        ])
        setIsWaitingForAnswer(true)

        AskCommand.execute({
            question: currentMessage,
            token
        })
        .then(async response => {
            if (response.isLeft()) {
                Toast.show({
                    type: "error",
                    text1: "Erro",
                    text2: "Geraldo não conseguiu responder sua pergunta agora"
                })
            } else {
                setMessages(currentMessages => [
                    ...currentMessages,
                    {
                        sender: "assistant",
                        content: response.value.response
                    }
                ])
            }
            setIsWaitingForAnswer(false)
        })

        setCurrentMessage("")
    }

    return (
        <AppFrame>
            <ScrollView 
            showsVerticalScrollIndicator={false}
            style={{
                backgroundColor: "#CFCFCF",
                flex: 1
            }}>
                { messages.map((message, index) => (
                    <MessageWrapper
                    key={index}
                    message={message}
                    />
                ))}
            </ScrollView>
            <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.select({ios: 40, android: 40})}
            style={{
                flex: 0.08,
                flexDirection: "row",
                paddingVertical: 10,
                backgroundColor: "#CFCFCF"
            }}>
                <View style={{
                    flexDirection: "row",
                    flex: 1,
                    width: "100%",
                    marginBottom: 5
                }}>
                    <TextInput
                    ref={keyboardRef}
                    editable={!isWaitingForAnswer}
                    value={currentMessage}
                    onChangeText={(text) => setCurrentMessage(text)}
                    placeholder="Digite sua dúvida ..."
                    placeholderTextColor="#13164B"
                    style={{
                        height: 40,
                        backgroundColor: "white",
                        width: "80%",
                        borderRadius: 10,
                        marginHorizontal: 5,
                        fontSize: 15,
                        paddingHorizontal: 8,

                    }}
                    />
                    <TouchableOpacity
                    onPress={sendMessage}
                    disabled={isWaitingForAnswer}
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#13164B",
                        borderRadius: 10,
                        marginHorizontal: 5,
                        height: 40
                    }}
                    >
                        <Arrow
                        width={35}
                        height={35}
                        />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </AppFrame>
    )
}