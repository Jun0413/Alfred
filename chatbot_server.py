#!/usr/bin/env python

from __future__ import division
# from builtins import bytes
import os
import argparse
import math
import codecs
# import torch

# import onmt
# import onmt.IO
# import opts
from itertools import takewhile, count
try:
    from itertools import zip_longest
except ImportError:
    from itertools import izip_longest as zip_longest
import SocketServer

# import sys
# sys.path.insert(0, './neural-belief-tracker/code')
# import simulator

#parser = argparse.ArgumentParser(
#    description='translate.py',
#    formatter_class=argparse.ArgumentDefaultsHelpFormatter)
#opts.add_md_help_argument(parser)
#opts.translate_opts(parser)
#opt = parser.parse_args()
#dummy_parser = argparse.ArgumentParser(description='train.py')
#opts.model_opts(dummy_parser)
#dummy_opt = dummy_parser.parse_known_args([])[0]

#opt.cuda = opt.gpu > -1
#if opt.cuda:
#    torch.cuda.set_device(opt.gpu)
#translator = onmt.Translator(opt, dummy_opt.__dict__)

#def predict(line):
#    out_file = codecs.open(opt.output, 'w', 'utf-8')
#    pred_score_total, pred_words_total = 0, 0
#    gold_score_total, gold_words_total = 0, 0
#    if opt.dump_beam != "":
#        import json
#        translator.initBeamAccum()
#
#    data = onmt.IO.ONMTDataset(
#        line, opt.tgt, translator.fields,
#        use_filter_pred=False)
#
#    test_data = onmt.IO.OrderedIterator(
#        dataset=data, device=opt.gpu,
#        batch_size=opt.batch_size, train=False, sort=False,
#        shuffle=False)
#
#    counter = count(1)
#    for batch in test_data:
#        pred_batch, gold_batch, pred_scores, gold_scores, attn, src \
#            = translator.translate(batch, data)
#                
#        pred_score_total += sum(score[0] for score in pred_scores)
#        pred_words_total += sum(len(x[0]) for x in pred_batch)
#        if opt.tgt:
#            gold_score_total += sum(gold_scores)
#            gold_words_total += sum(len(x) for x in batch.tgt[1:])
#
#        z_batch = zip_longest(
#                pred_batch, gold_batch,
#                pred_scores, gold_scores,
#                (sent.squeeze(1) for sent in src.split(1, dim=1)))
#
#        for pred_sents, gold_sent, pred_score, gold_score, src_sent in z_batch:
#           n_best_preds = [" ".join(pred) for pred in pred_sents[:opt.n_best]]
#
#            return (n_best_preds[0])

# bot = simulator.Simulator('./neural-belief-tracker/data/database.json', './neural-belief-tracker/data/corpus.json', './neural-belief-tracker/config/woz_stat_update.cfg', mode=1)
# bot = None

class MyTCPHandler(SocketServer.BaseRequestHandler):
    
    #def __init__(self, request, client_address, server):
    # self.bot = simulator.Simulator('./neural-belief-tracker/data/database.json', './neural-belief-tracker/data/corpus.json', './neural-belief-tracker/config/woz_stat_update.cfg', mode=1)

    def handle(self):
        # self.request is the TCP socket connected to the client
        self.data = self.request.recv(1024).strip()
        print("{} wrote:".format(self.client_address[0]))
        print(self.data)
        # just send back the same data, but upper-cased
        # data=predict(self.data.decode('utf-8'))
        # data=bytes(data, "utf-8")
        # print(data)
        # self.request.sendall(data)
        # utterance = self.data.decode('utf-8')
        # utterance = self.data
        # if '$$$' == utterance:
        #     utterance = 'expensive'
        # elif '$$' == utterance:
        #     utterance = 'moderate'
        # elif '$' == utterance:
        #     utterance = 'cheap'
        # utterance = self.data.decode('utf-8')
        # bot.update_states(utterance)
        # output = bot.generate_output_and_slots()['output']
        output = bytes("output")
        print(output)
        self.request.sendall(output)

        
if __name__ == "__main__":
    HOST, PORT = "localhost", 8080
    print("==========================")
    # Create the server, binding to localhost on port 9999
    server = SocketServer.TCPServer((HOST, PORT), MyTCPHandler)
        # Activate the server; this will keep running until you
        # interrupt the program with Ctrl-C
    server.serve_forever()
