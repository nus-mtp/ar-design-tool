using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System.Runtime.Serialization.Formatters.Binary;
using System.IO;
using System;

public class SaveProgress : MonoBehaviour {

    private const string SAVE_URL = "./uploadstate.php";
    private const string SAVE_FILE_NAME = "state.dat";
    private const string FIELD_NAME = "binary";
    private const string SAVE_START = "Saving your data now.";
    private const string SAVE_DONE = "Your data has been saved at {0}.";
    public StateManager stateManager;
    public UnityEngine.UI.Text text;

    public void Save(string url)
    {
        text.text = SAVE_START;
        StartCoroutine(PostData(url));
    }

    private IEnumerator PostData(string url)
    {
        WWWForm form = new WWWForm();
        form.AddBinaryData(FIELD_NAME, SerializeData(),SAVE_FILE_NAME);
        WWW www = new WWW(url,form);
        yield return www;

        if (!string.IsNullOrEmpty(www.error))
        {
            print(www.error);
          
        }
        else
        {
            text.text = string.Format(SAVE_DONE, DateTime.Now);
            www.Dispose();
        }

    }

    private byte[] SerializeData()
    {
        BinaryFormatter bf = new BinaryFormatter();
        SerialProjectState toSerialize = stateManager.ToSerial();
        MemoryStream s = new MemoryStream();
        bf.Serialize(s, toSerialize);
        return s.ToArray();
    }

   

    void Awake()
    {
        stateManager = gameObject.GetComponent<StateManager>();
    }

  
}
