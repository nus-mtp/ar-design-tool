#if UNITY_EDITOR
using UnityEngine;
using UnityEditor;
using System.Collections;
using System.Runtime.Serialization.Formatters.Binary;
using System.Collections.Generic;
using System.IO;

public class LoadState {
    const string SAVEDATA_PATH = "/StateData/state.dat";

    [MenuItem("File/Load State.dat")]
    public static List<SerialState> Load(){
        BinaryFormatter bf = new BinaryFormatter();
        Stream stream = new FileStream(Application.dataPath + SAVEDATA_PATH,FileMode.Open);
        List<SerialState> states = (List<SerialState>)bf.Deserialize(stream);
        stream.Close();
        return states;
    }
}
#endif