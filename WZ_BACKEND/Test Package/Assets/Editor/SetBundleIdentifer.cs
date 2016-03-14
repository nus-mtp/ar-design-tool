using UnityEngine;
using UnityEditor;
using System.Collections;

public class SetBundleIdentifer{
    
    private const string IDENTIFIER_FILE_PATH = "/BundleIndentifier/bundleIdentfier.txt";
    private static string identifier;

    [MenuItem("File/Set Identifier")]
    public static void SetIdentifier()
    {
       identifier = System.IO.File.ReadAllText(Application.dataPath + IDENTIFIER_FILE_PATH);
       PlayerSettings.bundleIdentifier = identifier;
    }
}
