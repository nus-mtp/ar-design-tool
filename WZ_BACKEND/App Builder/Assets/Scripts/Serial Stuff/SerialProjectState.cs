#if UNITY_EDITOR
using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System;

[Serializable]
public class SerialProjectState {

    public List<SerialState> serialStates;
    public int projectId;
    public int projectName;


}
#endif