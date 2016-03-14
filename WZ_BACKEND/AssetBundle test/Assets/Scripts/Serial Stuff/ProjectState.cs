#if UNITY_EDITOR
using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System;

[Serializable]
public class ProjectState {

    public List<SerialState> serialStates;
    public int projectId;
    public int projectName;


}
#endif