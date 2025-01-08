import React from "react";
import { Text, Platform, KeyboardAvoidingView, SafeAreaView, ScrollView, View } from "react-native";
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";

const handleHead = ({ tintColor }) => <Text style={{ color: tintColor }}>H1</Text>;
const RichTextEditor = ({ setAnsware, ans }) => {
    const richText = React.useRef();
    const [defaultValue, setDefaultValue] = React.useState(ans?ans:""); // Set your default value here

    React.useEffect(() => {
        if (ans && richText.current) {
            richText.current.setContentHTML(ans);
        }
    }, [ans]);

    return (
        <View style={{ paddingHorizontal: 10 }}>
            <ScrollView>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ flex: 1 }}
                >
                    <Text style={{ color: "black" }}>Answer:</Text>
                    <RichEditor
                        ref={richText}
                        style={{ borderWidth: 2, borderRadius: 0, borderColor: "#B3B3B3" }} // Set height to 100 pixels
                        initialContentHTML={defaultValue} // Set the default value here
                        onChange={(descriptionText) => {
                            // console.log("descriptionText:", descriptionText);
                            setAnsware(descriptionText)
                        }}
                    />
                </KeyboardAvoidingView>
            </ScrollView>

            <RichToolbar
                editor={richText}
                actions={[actions.setBold, actions.setItalic, actions.setUnderline, actions.heading1, actions.insertOrderedList]}
                iconMap={{ [actions.heading1]: handleHead }}
            />
        </View>
    );
};

export default RichTextEditor;
